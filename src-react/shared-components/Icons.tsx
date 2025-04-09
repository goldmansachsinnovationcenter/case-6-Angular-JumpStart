import styled from 'styled-components';

export const Icon = styled.i`
  margin-right: 0.5rem;
`;

export const LockIcon = styled.i.attrs({
  className: 'glyphicon glyphicon-lock'
})`
  margin-right: 0.5rem;
`;

export const ThumbsDownIcon = styled.i.attrs({
  className: 'glyphicon glyphicon-thumbs-down'
})`
  margin-right: 0.5rem;
`;

export const EditIcon = styled.i.attrs({
  className: 'glyphicon glyphicon-edit'
})`
  cursor: pointer;
  color: #337ab7;
  
  &:hover {
    color: #23527c;
  }
`;

export const DeleteIcon = styled.i.attrs({
  className: 'glyphicon glyphicon-trash'
})`
  cursor: pointer;
  color: #d9534f;
  
  &:hover {
    color: #c9302c;
  }
`;
