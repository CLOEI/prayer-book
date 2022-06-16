import React from 'react';
import {Box, Button, Text} from '@chakra-ui/react';

type Props = {
  title: string,
  text: string,
}

function PrayerCard({title, text}: Props) {
  return (
    <Box as="details" w="full">
      <Button as="summary" listStyleType="none" w="full" justifyContent="flex-start" fontWeight="bold" fontSize="xl">{title}</Button>
      <Box bg="gray.100" my="2" mx="4" p="1" rounded="sm">
        <Text>{text}</Text>
      </Box>
    </Box>
  );
}

export default PrayerCard;
