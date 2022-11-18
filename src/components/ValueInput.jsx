import React from 'react';
import dayjs from 'dayjs';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

import { db, storage } from '../firebase';

const ValueInput = () => {
  const [titleValue, setTitleValue] = React.useState('');
  const [descriptionValue, setDescriptionValue] = React.useState('');
  const [file, setFile] = React.useState(null);
  const [valueTimeInput, setValueTimeInput] = React.useState('');

  const toDeadlineTime = dayjs().add(valueTimeInput, 'm').format('HH:mm:ss DD.MM.YY');
  const timeForComparison = dayjs().add(valueTimeInput, 'm').unix();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const todosRef = doc(collection(db, 'todos'));
    if (titleValue) {
      try {
        if (file) {
          alert('Началась упаковка файла. Ожидайте. Через несколько секунд задача появится в пуле');
          const fileRef = ref(storage, file.name);
          await uploadBytesResumable(fileRef, file);
          await getDownloadURL(ref(storage, file.name))
            .then((url) => {
              setDoc(todosRef, {
                title: titleValue,
                description: descriptionValue,
                completed: false,
                deadlineTime: toDeadlineTime,
                serverDate: serverTimestamp(),
                clientDeadlineTime: timeForComparison,
                fileName: file.name,
                fileUrl: url,
              });
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          await setDoc(todosRef, {
            title: titleValue,
            description: descriptionValue,
            completed: false,
            deadlineTime: toDeadlineTime,
            serverDate: serverTimestamp(),
            clientDeadlineTime: timeForComparison,
          });
        }
      } catch (error) {
        alert('Произошла ошибка при отправки на сервер');
        console.error(error);
      } finally {
        setTitleValue('');
        setDescriptionValue('');
      }
    } else {
      alert('Впишите заголовок задачи');
    }
  };

  const handleChooseFile = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <section className="todo-input">
      <div className="todo-input__body">
        <form action="#" className="body-todo-input ">
          <input
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            type="text"
            className="body-todo-input__input-title universal-input"
            placeholder="Введите тему задачи"
            required
          />
          <input
            value={descriptionValue}
            onChange={(e) => setDescriptionValue(e.target.value)}
            type="text"
            className="body-todo-input__input-text universal-input"
            placeholder="Введите описание задачи"
            required
          />
          <div className="body-todo-input__row">
            <input onChange={handleChooseFile} className="body-todo-input__row-file" type="file" />
            <input
              value={valueTimeInput}
              onChange={(e) => setValueTimeInput(e.target.value)}
              className="body-todo-input__row-number universal-input"
              placeholder="Значение в минутах"
              type="number"
              min={1}
            />
          </div>
          <button onClick={handleSubmit} className="universal-button">
            Добавить задачу
          </button>
        </form>
      </div>
    </section>
  );
};

export default ValueInput;
