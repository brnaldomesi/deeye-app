import { Text, View } from 'react-native';

import Comment from './Comment';
import React from 'react';

const Comments = ({ 
  comments, 
  setCommentPosterInfo,
  isParentPost 
}) => {
  const filteredComments = isParentPost ? comments.filter(comment => comment.parent_id === null) : comments

  return (
    <View>
      {filteredComments && filteredComments.length > 0 && filteredComments.map(comment => 
        // <Comment key={comment.content.id} comment={comment.content} setCommentPosterInfo={setCommentPosterInfo} />
        <Comment 
          key={comment.id} 
          comment={comment} 
          setCommentPosterInfo={setCommentPosterInfo}
        />
      )}
    </View>
  )
};

export default React.memo(Comments);