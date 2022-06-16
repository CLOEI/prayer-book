import React, {useRef} from 'react';
import {AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, IconButton, Text, useColorModeValue, useDisclosure} from '@chakra-ui/react';
import {useDispatch} from 'react-redux';
import {deletePrayer} from '../redux/slice/prayerSlice';
import {BsTrashFill} from 'react-icons/bs';

import type {AppDispatch} from '../redux/store';

type Props = {
  id: string,
  title: string,
  text: string,
}

function PrayerCard({id, title, text}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const bg = useColorModeValue('gray.100', 'gray.700');

  const handleDelete = () => {
    dispatch(deletePrayer(id));
    onClose();
  };

  return (
    <Box as="details" w="full">
      <Button as="summary" listStyleType="none" w="full" justifyContent="space-between" fontWeight="bold" fontSize="xl">
        <Box w="full" overflow="hidden" pr="2" noOfLines={1}>
          <Text noOfLines={1}>{title}</Text>
        </Box>
        <IconButton onClick={onOpen} aria-label="Delete prayer" icon={<BsTrashFill/>} size="sm" colorScheme="red"/>
      </Button>
      <Box bg={bg} my="2" mx="4" p="1" rounded="sm">
        <Text>{text}</Text>
      </Box>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Delete prayer</AlertDialogHeader>
            <AlertDialogBody>
            Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}

export default PrayerCard;
