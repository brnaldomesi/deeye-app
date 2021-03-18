import * as yup from 'yup';

import { Controller, useForm } from "react-hook-form";
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useRef, useState } from 'react';
import {
  Size,
  p1,
  rounded1,
  wFull
} from 'src/styles';

import { ASSET_BASE_URL } from 'src/config/apipath';
import { Button } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import VideoPlayer from 'react-native-video-controls';
import styles from './styles';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  description: yup.string().required(),
  post_attachments: yup.array().ensure()
});

const handleAttachmentRemove = id => () => {

}

const _renderItem = ({item}) => {
  return (
    <View style={wFull}>
      <View style={rounded1}>
        {item.file_type === "Image" ? (
          <Image
            source={{ uri: ASSET_BASE_URL + item.path }}
            style={styles.post}
          />
        ) : (
          <VideoPlayer source={{ uri: ASSET_BASE_URL + item.path }} style={styles.post} paused={true} />
        )}
      </View>
      {/* <Button
        title="Delete"
        onPress={handleAttachmentRemove(item.id)}
        buttonStyle={styles.deleteBtn}
      /> */}
    </View>
  )
}

const PostForm = ({
  post,
  onSubmit
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [attachments, setAttachments] = useState(post.post_attachments)

  const defaultValues = {
    description: post.description,
  };

  const { register, handleSubmit, control, errors } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema)
  });

  return (
    <View style={p1}>
      {/*{post.post_type === 'MissingPerson' ? (*/}
      {/*  <View><Text>123</Text></View>*/}
      {/*) : (*/}
      {/*  <>*/}
      {/*    {attachments.length > 0 && */}
      {/*      <Controller */}
      {/*        control={control}*/}
      {/*        name="post_attachments"*/}
      {/*        render={props => (*/}
      {/*          <Carousel*/}
      {/*            layout={"default"}*/}
      {/*            ref={props.ref}*/}
      {/*            data={attachments}*/}
      {/*            sliderWidth={Size(23)}*/}
      {/*            itemWidth={Size(17)}*/}
      {/*            renderItem={_renderItem}*/}
      {/*            onSnapToItem = { index => setActiveIndex(index) } */}
      {/*          />*/}
      {/*        )}*/}
      {/*        defaultValue={attachments}*/}
      {/*      />*/}
      {/*    }*/}
      {/*    <Controller*/}
      {/*      control={control}*/}
      {/*      name="description"*/}
      {/*      render={props => (*/}
      {/*        <TextInput */}
      {/*          multiline*/}
      {/*          numberOfLines={4}*/}
      {/*          value={props.value}*/}
      {/*          onChangeText={value => props.onChange(value)}*/}
      {/*          textAlignVertical="top"*/}
      {/*          placeholder="What would you like to share?"*/}
      {/*        />*/}
      {/*      )}*/}
      {/*    />*/}
      {/*  </>*/}
      {/*)}*/}

      {/*<Button title="Update" onPress={handleSubmit(onSubmit)} />*/}
    </View>
  )
}

export default PostForm;
