import React from 'react';
import dayjs from 'dayjs';
import { doc, updateDoc } from 'firebase/firestore';

import { db } from '../firebase';

export const Todo = ({ todo, handleDeleteTodo, handleEditTodo, handleToggleCompleted }) => {
  const [isEditTodo, setIsEditTodo] = React.useState(false);
  const [editTitleTodo, setEditTitleTodo] = React.useState(todo.title);
  const [editDescriptionTodo, setEditDescriptionTodo] = React.useState(todo.description);

  React.useEffect(() => {
    const interval = setInterval(async () => {
      const timeNow = dayjs().unix();

      if (timeNow >= todo.clientDeadlineTime) {
        await updateDoc(doc(db, 'todos', todo.id), { completed: true });
      }
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const handleIsEdit = () => {
    handleEditTodo(todo, editTitleTodo, editDescriptionTodo);
    setIsEditTodo(!isEditTodo);
  };

  return (
    <div className="todos__body">
      <div className="body-todos__row">
        {isEditTodo ? (
          <div className="body-todos__text-block">
            <div>
              <textarea
                className="body-todos-text-block__title-input"
                type="text"
                value={editTitleTodo}
                onChange={(e) => setEditTitleTodo(e.target.value)}
                rows="3"
                placeholder="Your name..."
                id="textName"></textarea>
            </div>
            <div>
              <textarea
                className="body-todos-text-block__text-input"
                type="text"
                value={editDescriptionTodo}
                onChange={(e) => setEditDescriptionTodo(e.target.value)}
                rows="3"
                placeholder="Your name..."
                id="textName"></textarea>
            </div>
          </div>
        ) : (
          <div className="body-todos__text-block">
            <div
              className={
                todo.completed
                  ? 'body-todos-text-block__title body-todos-text-block__title_done'
                  : 'body-todos-text-block__title '
              }>
              <h4>{todo.title}</h4>
            </div>
            <div
              className={
                todo.completed
                  ? 'body-todos-text-block__text body-todos-text-block__text_done'
                  : 'body-todos-text-block__text '
              }>
              <p>{todo.description}</p>
            </div>
          </div>
        )}
        {isEditTodo ? (
          <div className="body-todos__icons">
            <div onClick={handleIsEdit} className="body-todos-icons__edit">
              <svg
                width="23"
                height="30"
                viewBox="0 0 23 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.75 15H17.25V17.5H5.75V15ZM5.75 22.5H13.8V20H5.75V22.5ZM23 9.4825V30H0V3.75C0 2.75544 0.363481 1.80161 1.01048 1.09835C1.65748 0.395088 2.535 0 3.45 0L14.2761 0L23 9.4825ZM14.95 8.75H19.0739L14.95 4.2675V8.75ZM20.7 27.5V11.25H12.65V2.5H3.45C3.145 2.5 2.85249 2.6317 2.63683 2.86612C2.42116 3.10054 2.3 3.41848 2.3 3.75V27.5H20.7Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>
        ) : (
          <div className="body-todos__icons">
            <div onClick={() => handleToggleCompleted(todo)} className="body-todos-icons__status">
              {todo.completed ? (
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_50_16)">
                    <path
                      d="M23.125 30H6.87498C3.07975 29.9958 0.00416016 26.9203 0 23.125V6.87498C0.00416016 3.07975 3.07975 0.00416016 6.87498 0H23.125C26.9203 0.00416016 29.9958 3.07975 30 6.87498V23.125C29.9958 26.9203 26.9203 29.9958 23.125 30ZM6.87498 3.75C5.1491 3.75 3.75 5.1491 3.75 6.87498V23.125C3.75 24.8509 5.1491 26.25 6.87498 26.25H23.125C24.8509 26.25 26.25 24.8509 26.25 23.125V6.87498C26.25 5.1491 24.8509 3.75 23.125 3.75H6.87498Z"
                      fill="#20A04C"
                    />
                    <path
                      d="M12.0838 22.2338C11.295 22.2343 10.5388 21.9192 9.9838 21.3588L6.25003 17.6313C5.51755 16.8993 5.5172 15.7121 6.24921 14.9796C6.24951 14.9793 6.2498 14.979 6.25003 14.9787C6.98222 14.2468 8.1691 14.2468 8.90128 14.9787L12.0838 18.16L21.0988 9.14497C21.831 8.41302 23.0179 8.41302 23.7501 9.14497C24.4825 9.87698 24.4829 11.0642 23.7509 11.7966C23.7506 11.7969 23.7503 11.7972 23.7501 11.7975L14.1826 21.365C13.627 21.9231 12.8713 22.2359 12.0838 22.2338Z"
                      fill="#20A04C"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_50_16">
                      <rect width="30" height="30" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              ) : (
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_50_14)">
                    <path
                      d="M15 6.25C14.5027 6.25 14.0258 6.05246 13.6742 5.70083C13.3225 5.34919 13.125 4.87228 13.125 4.375V1.875C13.125 1.37772 13.3225 0.900805 13.6742 0.549175C14.0258 0.197544 14.5027 0 15 0C15.4973 0 15.9742 0.197544 16.3258 0.549175C16.6775 0.900805 16.875 1.37772 16.875 1.875V4.375C16.875 4.87228 16.6775 5.34919 16.3258 5.70083C15.9742 6.05246 15.4973 6.25 15 6.25V6.25ZM16.875 28.125V25.625C16.875 25.1277 16.6775 24.6508 16.3258 24.2992C15.9742 23.9475 15.4973 23.75 15 23.75C14.5027 23.75 14.0258 23.9475 13.6742 24.2992C13.3225 24.6508 13.125 25.1277 13.125 25.625V28.125C13.125 28.6223 13.3225 29.0992 13.6742 29.4508C14.0258 29.8025 14.5027 30 15 30C15.4973 30 15.9742 29.8025 16.3258 29.4508C16.6775 29.0992 16.875 28.6223 16.875 28.125ZM6.25 15C6.25 14.5027 6.05246 14.0258 5.70083 13.6742C5.34919 13.3225 4.87228 13.125 4.375 13.125H1.875C1.37772 13.125 0.900805 13.3225 0.549175 13.6742C0.197544 14.0258 0 14.5027 0 15C0 15.4973 0.197544 15.9742 0.549175 16.3258C0.900805 16.6775 1.37772 16.875 1.875 16.875H4.375C4.87228 16.875 5.34919 16.6775 5.70083 16.3258C6.05246 15.9742 6.25 15.4973 6.25 15V15ZM30 15C30 14.5027 29.8025 14.0258 29.4508 13.6742C29.0992 13.3225 28.6223 13.125 28.125 13.125H25.625C25.1277 13.125 24.6508 13.3225 24.2992 13.6742C23.9475 14.0258 23.75 14.5027 23.75 15C23.75 15.4973 23.9475 15.9742 24.2992 16.3258C24.6508 16.6775 25.1277 16.875 25.625 16.875H28.125C28.6223 16.875 29.0992 16.6775 29.4508 16.3258C29.8025 15.9742 30 15.4973 30 15ZM21.845 6.66125L23.0713 4.4825C23.3056 4.05006 23.3607 3.54284 23.2245 3.07019C23.0884 2.59753 22.772 2.1973 22.3435 1.95576C21.9151 1.71422 21.4088 1.65072 20.934 1.77895C20.4591 1.90717 20.0537 2.21686 19.805 2.64125L18.5775 4.82C18.4565 5.0346 18.379 5.27095 18.3493 5.51553C18.3197 5.76011 18.3386 6.00813 18.4049 6.24541C18.4712 6.4827 18.5836 6.70459 18.7357 6.89841C18.8877 7.09223 19.0765 7.25418 19.2912 7.375C19.5713 7.53423 19.8879 7.61781 20.21 7.6175C20.5429 7.61759 20.8698 7.52906 21.1571 7.36101C21.4445 7.19295 21.6819 6.95143 21.845 6.66125V6.66125ZM10.195 27.3587L11.4225 25.18C11.6667 24.7467 11.7287 24.2342 11.595 23.7551C11.4612 23.2761 11.1427 22.8698 10.7094 22.6256C10.2761 22.3815 9.76353 22.3194 9.28449 22.4532C8.80546 22.5869 8.39917 22.9055 8.155 23.3387L6.92875 25.5175C6.69439 25.9499 6.63934 26.4572 6.77547 26.9298C6.91159 27.4025 7.228 27.8027 7.65647 28.0442C8.08495 28.2858 8.59118 28.3493 9.06604 28.2211C9.54089 28.0928 9.94635 27.7831 10.195 27.3587V27.3587ZM7.375 10.7088C7.61909 10.2756 7.68116 9.76324 7.54754 9.28434C7.41393 8.80544 7.09558 8.39921 6.6625 8.155L4.4825 6.92875C4.05006 6.69439 3.54284 6.63934 3.07019 6.77547C2.59753 6.91159 2.1973 7.228 1.95576 7.65647C1.71422 8.08495 1.65072 8.59118 1.77895 9.06604C1.90717 9.54089 2.21686 9.94635 2.64125 10.195L4.82 11.4225C5.0346 11.5435 5.27095 11.621 5.51553 11.6507C5.76011 11.6803 6.00813 11.6614 6.24541 11.5951C6.4827 11.5288 6.70459 11.4164 6.89841 11.2643C7.09223 11.1123 7.25418 10.9235 7.375 10.7088ZM28.0725 22.3587C28.3166 21.9256 28.3787 21.4132 28.245 20.9343C28.1114 20.4554 27.7931 20.0492 27.36 19.805L25.1813 18.5775C24.9667 18.4566 24.7304 18.3791 24.486 18.3496C24.2415 18.32 23.9936 18.3388 23.7564 18.405C23.5192 18.4713 23.2973 18.5835 23.1035 18.7355C22.9097 18.8874 22.7478 19.0761 22.6269 19.2906C22.506 19.5052 22.4285 19.7414 22.3989 19.9859C22.3693 20.2304 22.3882 20.4783 22.4544 20.7155C22.5881 21.1945 22.9067 21.6008 23.34 21.845L25.5188 23.0713C25.9519 23.3153 26.4643 23.3774 26.9432 23.2438C27.4221 23.1102 27.8283 22.7918 28.0725 22.3587V22.3587ZM10.7088 7.375C11.142 7.131 11.4607 6.72486 11.5945 6.24595C11.7284 5.76703 11.6665 5.25455 11.4225 4.82125L10.195 2.64125C9.94635 2.21686 9.54089 1.90717 9.06604 1.77895C8.59118 1.65072 8.08495 1.71422 7.65647 1.95576C7.228 2.1973 6.91159 2.59753 6.77547 3.07019C6.63934 3.54284 6.69439 4.05006 6.92875 4.4825L8.155 6.66125C8.31827 6.9512 8.55576 7.19247 8.84309 7.3603C9.13043 7.52813 9.45724 7.61647 9.79 7.61625C10.112 7.61694 10.4286 7.53379 10.7088 7.375V7.375ZM22.3587 28.0725C22.7918 27.8283 23.1102 27.4221 23.2438 26.9432C23.3774 26.4643 23.3153 25.9519 23.0713 25.5188L21.845 23.34C21.6008 22.9067 21.1945 22.5881 20.7155 22.4544C20.2365 22.3207 19.7239 22.3827 19.2906 22.6269C18.8573 22.871 18.5388 23.2773 18.405 23.7564C18.2713 24.2354 18.3333 24.748 18.5775 25.1813L19.805 27.36C20.0492 27.7931 20.4554 28.1114 20.9343 28.245C21.4132 28.3787 21.9256 28.3166 22.3587 28.0725V28.0725ZM25.18 11.4225L27.3587 10.195C27.7831 9.94635 28.0928 9.54089 28.2211 9.06604C28.3493 8.59118 28.2858 8.08495 28.0442 7.65647C27.8027 7.228 27.4025 6.91159 26.9298 6.77547C26.4572 6.63934 25.9499 6.69439 25.5175 6.92875L23.3387 8.155C22.9055 8.39917 22.5869 8.80546 22.4532 9.28449C22.3194 9.76353 22.3815 10.2761 22.6256 10.7094C22.8698 11.1427 23.2761 11.4612 23.7551 11.595C24.2342 11.7287 24.7467 11.6667 25.18 11.4225ZM4.4825 23.0713L6.66125 21.845C6.8758 21.7241 7.06443 21.5621 7.21638 21.3683C7.36833 21.1745 7.48062 20.9527 7.54684 20.7155C7.61306 20.4783 7.63191 20.2304 7.60232 19.9859C7.57273 19.7414 7.49527 19.5052 7.37437 19.2906C7.25348 19.0761 7.0915 18.8874 6.89771 18.7355C6.70391 18.5835 6.48208 18.4713 6.24488 18.405C6.00768 18.3388 5.75977 18.32 5.51529 18.3496C5.27081 18.3791 5.03455 18.4566 4.82 18.5775L2.64125 19.805C2.28056 20.0088 1.9975 20.3263 1.83629 20.7079C1.67509 21.0895 1.64481 21.5138 1.75018 21.9144C1.85555 22.3151 2.09065 22.6695 2.41875 22.9225C2.74685 23.1754 3.14948 23.3126 3.56375 23.3125C3.88576 23.3132 4.2024 23.2301 4.4825 23.0713V23.0713Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_50_14">
                      <rect width="30" height="30" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              )}
            </div>
            {!todo.completed && (
              <div onClick={handleIsEdit} className="body-todos-icons__edit">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_50_11)">
                    <path
                      d="M18.255 7.10876L0 25.3625V30H4.6375L22.8912 11.745L18.255 7.10876Z"
                      fill="black"
                    />
                    <path
                      d="M29.0401 0.960008C28.425 0.345231 27.591 -0.00012207 26.7213 -0.00012207C25.8517 -0.00012207 25.0177 0.345231 24.4026 0.960008L20.0276 5.34126L24.6638 9.97751L29.0388 5.60251C29.3441 5.29794 29.5863 4.93618 29.7516 4.53792C29.9168 4.13966 30.002 3.71271 30.0021 3.28152C30.0022 2.85032 29.9173 2.42333 29.7522 2.02498C29.5872 1.62663 29.3452 1.26474 29.0401 0.960008V0.960008Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_50_11">
                      <rect width="30" height="30" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            )}
            <div onClick={() => handleDeleteTodo(todo)} className="body-todos-icons__delete">
              <svg
                width="24"
                height="30"
                viewBox="0 0 24 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M24 5.625C24 4.58947 23.2674 3.75 22.3636 3.75H18.2444C17.555 1.5092 15.7099 0.00761719 13.6364 0H10.3636C8.29011 0.00761719 6.44496 1.5092 5.75565 3.75H1.63636C0.73263 3.75 0 4.58947 0 5.625C0 6.66053 0.73263 7.5 1.63636 7.5H2.18183V23.125C2.18183 26.922 4.86812 30 8.18181 30H15.8181C19.1319 30 21.8182 26.922 21.8182 23.125V7.5H22.3636C23.2674 7.5 24 6.66053 24 5.625ZM18.5454 23.125C18.5454 24.8509 17.3244 26.25 15.8182 26.25H8.18181C6.67559 26.25 5.45455 24.8509 5.45455 23.125V7.5H18.5454V23.125Z"
                  fill="black"
                />
                <path
                  d="M9.27259 22.5C10.1763 22.5 10.909 21.6605 10.909 20.625V13.125C10.909 12.0895 10.1763 11.25 9.27259 11.25C8.36886 11.25 7.63623 12.0895 7.63623 13.125V20.625C7.63623 21.6605 8.36886 22.5 9.27259 22.5Z"
                  fill="black"
                />
                <path
                  d="M14.7272 22.5C15.6309 22.5 16.3635 21.6605 16.3635 20.625V13.125C16.3635 12.0895 15.6309 11.25 14.7272 11.25C13.8234 11.25 13.0908 12.0895 13.0908 13.125V20.625C13.0908 21.6605 13.8234 22.5 14.7272 22.5Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="body-todos__down-row">
        <div
          className={
            todo.completed ? 'body-todos__time body-todos__time_done' : 'body-todos__time '
          }>
          <p>Дeдлайн: {todo.deadlineTime}</p>
          <p>Создана: {todo.createTime}</p>
        </div>
        {todo.fileUrl && (
          <div className="">
            <a href={todo.fileUrl}>{todo.fileName}</a>
          </div>
        )}
      </div>
    </div>
  );
};