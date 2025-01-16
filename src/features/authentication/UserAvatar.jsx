import styled from "styled-components";
import { useUser } from "./useUser";

const StyledUserAvatar = styled.div.attrs({ name: 'user-avatar' })`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.5rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

export default function UserAvatar ()
{
  const { user } = useUser();
  const { avatar, fullName } = user.user_metadata;

  return (
    <StyledUserAvatar>
      <Avatar src={avatar || '../src/data/img/default-user.jpg'} alt={`Аватар ${fullName}`} />
      <span>{fullName ? fullName : 'админ'}</span>
    </StyledUserAvatar>
  );
}
