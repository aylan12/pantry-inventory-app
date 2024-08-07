import {Box, Stack, Typography} from '@mui/material'
import {firestore} from '@/firebase'


const item = ['tomato', 'potato', 'onion', 'garlic', 'ginger', 'carrot', 'lettuce', 'kale', 'cucumber']

export default function Home() {
  return (
    <Box 
      width="100vw" 
      height="100vh"
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
    >
      <Box border={'1px solid #333'}>

        <Box 
          width="800px"  
          height="100px" 
          bgcolor={'#ADD8E6'} 
          display={'flex'}
          justifyContent={'center'}
          flexDirection={'column'}
          alignItems={'center'} 
        >
          <Typography variant={'h2'} color={'#333'} textAlign={'center'}>
            Pantry Items
          </Typography>
        </Box>
        <Stack width="800px" height="300px" spacing={2} overflow={'auto'}>
          {item.map((i) => (
            <Box
              key={i}
              width="100%"
              height="300px"
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              bgcolor={'#f0f0f0'}
            >
              <Typography
                variant={'h3'}
                color={'#333'}
                textAlign={'center'}
              >
                {
                  //Capitaize the first ketter of the item
                  i.charAt(0).toUpperCase() + i.slice(1)
                }
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}


/*
'use client'

import { useState, useEffect } from 'react'
import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material'
import { firestore } from '@/firebase'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore'

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
}

export default function Home() {
  // We'll add our component logic here
  const [inventory, setInventory] = useState([]) //manage inventory list
  const [open, setOpen] = useState(false) //manage modal state
  const [itemName, setItemName] = useState('') //manage new item input

  //implement inventory fetching from Firestone -> updates local state
  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() })
    })
    setInventory(inventoryList)
  }
  
  useEffect(() => { //ensures that it's running when the component mounts
    updateInventory()
  }, [])

  //implement add & remove functions by interacting with Firestone to add/rem
  //items and update our local state
  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await setDoc(docRef, { quantity: quantity + 1 })
    } else {
      await setDoc(docRef, { quantity: 1 })
    }
    await updateInventory()
  }
  
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, { quantity: quantity - 1 })
      }
    }
    await updateInventory()
  }
  //add modal control functions to manage the modal state
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  //modal for adding new items, "add new item" button to open modal, box displaying
  //inventory items, show name/quantity/"Remove" button for each item
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
      <Button variant="contained" onClick={handleOpen}>
        Add New Item
      </Button>
      <Box border={'1px solid #333'}>
        <Box
          width="800px"
          height="100px"
          bgcolor={'#ADD8E6'}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography variant={'h2'} color={'#333'} textAlign={'center'}>
            Inventory Items
          </Typography>
        </Box>
        <Stack width="800px" height="300px" spacing={2} overflow={'auto'}>
          {inventory.map(({name, quantity}) => (
            <Box
              key={name}
              width="100%"
              minHeight="150px"
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              bgcolor={'#f0f0f0'}
              paddingX={5}
            >
              <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
                Quantity: {quantity}
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
  */