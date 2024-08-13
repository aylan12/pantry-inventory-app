'use client'
import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material'
import { firestore } from '@/firebase'
import { collection, doc, query, setDoc, getDocs, deleteDoc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

const style = {
  position: 'absolute', 
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

export default function Home() {
  const [pantry, setPantry] = useState([])
  const [filteredPantry, setFilteredPantry] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'pantry'));
    const docs = await getDocs(snapshot);
    const pantryList = [];
    docs.forEach((doc) => {
      pantryList.push({ name: doc.id, ...doc.data() });
    });
    setPantry(pantryList);
  };

  useEffect(() => {
    updatePantry();
  }, [])

  useEffect(() => {
    const results = pantry.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredPantry(results)
  }, [searchTerm, pantry])

  const addItem = async (item) => {
    item = item.toLowerCase() // lowercase/uppercase doesn't matter
    const docRef = doc(collection(firestore, 'pantry'), item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const { count } = docSnap.data()
      await setDoc(docRef, { count: count + 1 })
    } else {
      await setDoc(docRef, { count: 1 })
    }
    await updatePantry()
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { count } = docSnap.data()
      if (count === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, { count: count - 1 })
      }
    }
    await updatePantry()
  }

  return (
    <Box 
      width="100vw" 
      height="100vh"
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={2}
    >
      <TextField 
        label="Search Items" 
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', width: '300px' }}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction={'row'} spacing={2}>
            <TextField 
              id="outlined-basic"  
              label="Item" 
              variant="outlined" 
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button 
              variant="outlined"
              onClick={() => {
                addItem(itemName)
                setItemName('')
                handleClose()
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button 
        variant="contained" 
        onClick={handleOpen}
        style={{ width: '100px', height: '50px', fontSize: '20px' }}
      >
        Add
      </Button>
      <Box border={'1px solid #333'}>
        <Box 
          width="1000px"  
          height="100px"
          bgcolor={'#5F9EA0'} 
          display={'flex'}
          justifyContent={'center'}
          flexDirection={'column'}  
          alignItems={'center'} 
        >
          <Typography variant={'h2'} color={'white'} textAlign={'center'} fontSize={'50px'}>
            Pantry Items
          </Typography>
        </Box>
        <Stack width="1000px" height="400px" spacing={1} overflow={'auto'}>
          {filteredPantry.map(({ name, count }) => (
            <Box
              key={name}
              width="100%"
              minHeight="100px"
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              bgcolor={'#E0FFFF'}
              paddingX={5}
            >
              <Typography
                variant={'h3'}
                color={'black'}
                textAlign={'center'}
                fontSize={45}
                style={{ fontFamily: 'monospace' }}
              >
                - {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant={'h3'} color={'grey'} textAlign={'center'} fontSize={30} style={{ fontFamily: 'monospace' }}>
                {'('}Quantity: {count}{')'}
              </Typography>
              <Button variant="contained" onClick={() => removeItem(name)}>
                Remove
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}