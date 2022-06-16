import React, {useEffect, useState} from 'react';
import {Button, Heading, HStack, IconButton, Input, Textarea, VStack, chakra} from '@chakra-ui/react';
import {AiOutlineMenu, AiOutlinePlusCircle} from 'react-icons/ai';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {nanoid} from 'nanoid';
import autosize from 'react-textarea-autosize';

import {selectPrayers} from '../redux/store';
import {getPrayers, addPrayer} from '../redux/slice/prayerSlice';
import PrayerCard from '../components/PrayerCard';
import Layout from '../components/Layout';

import type {AppDispatch} from '../redux/store';

function Prayer() {
  const [title, setTitle] = useState('');
  const [addToggled, setAddToggled] = useState(false);
  const prayers = useSelector(selectPrayers);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPrayers());
  }, []);

  const gotoHome= () => navigate('/');

  const addPrayerHandler = (title: string, text: string) => {
    dispatch(addPrayer({
      id: nanoid(16),
      title,
      text,
    }));
  };

  const toggleAdd = () => {
    setAddToggled((state) => {
      setTitle('');
      return !state;
    });
  };

  const titleOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = (e.target as any).title as HTMLInputElement;
    const text = (e.target as any).text as HTMLTextAreaElement;

    addPrayerHandler(title.value, text.value);
    (e.target as HTMLFormElement).reset();
    toggleAdd();
  };

  return (
    <Layout>
      <HStack justifyContent="space-between">
        <IconButton
          onClick={gotoHome}
          aria-label="Menu" icon={<AiOutlineMenu/>}/>
        <Heading as="h1">Prayer Book</Heading>
        <IconButton
          onClick={toggleAdd}
          aria-label="Add prayer" icon={<AiOutlinePlusCircle/>}/>
      </HStack>
      <VStack my="6">
        {addToggled && (
          <chakra.form onSubmit={formSubmitHandler}
            w="full">
            <Input
              name="title"
              onChange={titleOnChangeHandler}
              placeholder="Title..." required/>
            {title.length > 0 && (
              <HStack my={2} alignItems="flex-start">
                <Textarea
                  name="text"
                  as={autosize} resize="none"
                  placeholder="Prayer text..." required/>
                <Button type="submit" colorScheme="green">Add</Button>
              </HStack>
            )}
          </chakra.form>
        )}
        {prayers.loading === false && prayers.data.map(({id, ...text}) => {
          return <PrayerCard key={id} {...text}/>;
        })}
      </VStack>
    </Layout>
  );
}

export default Prayer;
