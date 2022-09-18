import { useState, useRef, useCallback, useEffect } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: 0,
      text: '리액트의 기초 알아보기',
      checked: true,
    },
    {
      id: 1,
      text: '컴포넌트 스타일링해 보기',
      checked: true,
    },
    {
      id: 2,
      text: '일정 관리 앱 만들어 보기',
      checked: false,
    },
  ]);

  useEffect(() => {
    console.log('렌더링 완료');
    console.log(todos);
  }, [todos]);

  // 고윳값으로 사용될 id
  // ref를 사용해 변수 담기
  const nextId = useRef(3);

  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    setTodos((todos) => todos.concat(todo));
    nextId.current += 1;
  }, []);

  const onRemove = useCallback((id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }, []);

  const onToggle = useCallback((id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
  }, []);

  // const onInsert = useCallback((text) => {
  //   const todo = {
  //     id: nextId.current,
  //     text,
  //     checked: false,
  //   };
  //   setTodos(todos.concat(todo));
  //   nextId.current += 1;
  // }, [todos]);

  // const onRemove = useCallback((id) => {
  //   setTodos(todos.filter((todo) => todo.id !== id));
  // }, [todos]);

  // const onToggle = useCallback((id) => {
  //   setTodos(
  //     todos.map((todo) =>
  //       todo.id === id ? { ...todo, checked: !todo.checked } : todo,
  //     ),
  //   );
  // }, [todos]);

  const onDragAndDrop = useCallback(
    (srcItemIdx, destItemIdx) => {
      const newTodos = [...todos]; // todos를 복사한 새로운 별도 배열 객체
      const dragItem = newTodos[srcItemIdx];

      let temp = [...newTodos];
      console.log('todos >> ');
      console.log(temp);

      newTodos.splice(srcItemIdx, 1);
      temp = [...newTodos];

      console.log('splice srcIdx, 1 >> ');
      console.log(temp);

      newTodos.splice(destItemIdx, 0, dragItem);
      temp = [...newTodos];

      console.log('splice destIdx, 0, dragItem >> ');
      console.log(temp);

      setTodos(newTodos);
    },
    [todos],
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList
        todos={todos}
        onRemove={onRemove}
        onToggle={onToggle}
        onDragAndDrop={onDragAndDrop}
      />
    </TodoTemplate>
  );
};

export default App;
