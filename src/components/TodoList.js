import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TodoList = ({ todos, onRemove, onToggle, onDragAndDrop }) => {
  const dragEnd = (res) => {
    console.log('Drag End');
    console.log('res', res);
    const srcItemNo = res.source.index;
    const destItemNo = res.destination.index;

    onDragAndDrop(srcItemNo, destItemNo);
  };

  return (
    <DragDropContext onDragEnd={dragEnd}>
      <Droppable droppableId="droppableList">
        {(provided) => (
          <div
            className="TodoList"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {todos.map((todo, index) => {
              return (
                <Draggable
                  draggableId={'DId' + String(todo.id)}
                  index={index}
                  key={'draggable' + todo.id}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TodoListItem
                        todo={todo}
                        key={'item' + todo.id}
                        onRemove={onRemove}
                        onToggle={onToggle}
                      />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default React.memo(TodoList);
