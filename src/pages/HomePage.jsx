import React from 'react';
import dayjs from 'dayjs';
import { collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';

import { Todo } from '../components/Todo';
import ValueInput from '../components/ValueInput';
import { db } from '../firebase';

const HomePage = () => {
  const [todos, setTodos] = React.useState([]);

  React.useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({
          ...doc.data(),
          id: doc.id,
          createTime: dayjs.unix(doc.data().serverDate?.seconds).format('HH:mm:ss DD.MM.YY'),
        });
      });
      setTodos(todosArray);
    });
    return () => unsub();
  }, []);

  const handleEditTodo = async (todo, title, description) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      title: title,
      description: description,
    });
  };
  const handleToggleCompleted = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), { completed: !todo.completed });
  };
  const handleDeleteTodo = async (todo) => {
    await deleteDoc(doc(db, 'todos', todo.id));
  };

  return (
    <div className="main">
      <div className="main__container">
        <section className="main__title">
          <h1 className="main__title-text">Todo App</h1>
          <p className="main__text universal-text">
            with <span>Firebase</span>
          </p>
        </section>
        <ValueInput />
        <section className="todos">
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              handleEditTodo={handleEditTodo}
              handleToggleCompleted={handleToggleCompleted}
              handleDeleteTodo={handleDeleteTodo}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
