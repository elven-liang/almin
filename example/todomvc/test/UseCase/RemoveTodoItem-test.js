// LICENSE : MIT
"use strict";
const assert = require("power-assert");
import MemoryDB from "../../src/infra/adpter/MemoryDB";
import TodoList from "../../src/domain/TodoList/TodoList";
import {TodoListRepository} from "../../src/infra/TodoRepository";
import {RemoveTodoItemUseCase} from "../../src/usecase/RemoveTodoItem";
describe("RemoveTodoItemUseCase", function () {
    it("should add TodoItem with title", function (done) {
        const mockTodoList = new TodoList();
        const existingTodoItem = mockTodoList.addItem("before ");
        // prepare
        const todoListRepository = new TodoListRepository(new MemoryDB());
        todoListRepository.save(mockTodoList);
        const useCase = new RemoveTodoItemUseCase({
            todoListRepository
        });
        // Then
        todoListRepository.onChange(() => {
            // re-get todoList
            const storedTodoList = todoListRepository.find(mockTodoList);
            assert(!storedTodoList.hasItem(existingTodoItem.id));
            done();
        });
        // When
        useCase.execute(existingTodoItem.id);
    });
});