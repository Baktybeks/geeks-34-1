import React, { useEffect, useState } from 'react';
import Buttons from '../../components/buttons/Buttons';
import User from '../user/User';
import Example from '../../components/example/Example';
import Header from '../../components/header/Header';
import Modal from '../../components/modal/Modal';
import Input from '../../components/input/Input';
import TodoList from '../../components/TodoList/TodoList';
import Button from '../../components/button/Button';


const MainPage = () => {
    const navBar = [ 'Главная', 'Контакты', 'О нас', 'О нас' ];
    // let show = false
    // console.log(show, 'start');
    const [ show, setShow ] = useState(false);
    // console.log(show, 'showshowshowshow');
    const [ tasks, setTasks ] = useState([]);
    // console.log(tasks);
    const handleShow = () => {
        // show = true
        // console.log(show, ' end');
        setShow(!show);
    };
    const [ inputTask, setInputTask ] = useState('');
    const onChangeInputTask = (event) => {
        setInputTask(event.target.value);
    };

    const handleAdd = () => {
        setTasks(prev => [ ...prev, {
            id: tasks.length === 0 ? 1 : tasks[ tasks.length - 1 ].id + 1,
            title: inputTask,
            completed: false
        } ]);
    };

    const handleDone = (id) => {
        console.log(id);
        tasks.map(task => {
            if (task.id === id) {
                return task.completed = !task.completed;
            }
        });
        setTasks([ ...tasks ]);
    };

    const handleEdit = (editTodo) => {
        console.log(editTodo);
        tasks.map(task => {
            if (task.id === editTodo.id) return task.title = editTodo.title;
        });
        setTasks([ ...tasks ]);
    };


    const handleDelete = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    // const a= [1,2,3,4,5]
    // const b= [5,1,8,9,4,1,2,3,4,5]
    // console.log([...a,...b]);

    useEffect(() => {
        console.log('useEffect');
    }, [ tasks ]);

    const sendLocalStorage = () => {
        localStorage.setItem('name', 'Baktybek');
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const getLocalStorage = () => {
        console.log(JSON.parse(localStorage.getItem('tasks')));
    };

    useEffect(() => {
        const myLocalStorage = JSON.parse(localStorage.getItem('tasks'));
        if (myLocalStorage === null) {
            return localStorage.setItem('tasks', JSON.stringify(tasks))
        }
        if (myLocalStorage.length !==0) {
            setTasks(myLocalStorage)
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks]);

    const BASE_URL = 'https://jsonplaceholder.typicode.com/'
    const getApi = async(api) => {
        const response = await fetch(`${BASE_URL}${api}`);
        const  data = await response.json()
        return data
    };

    const [users, setUsers] = useState([])
    console.log(users, 'users');

    useEffect(() => {
        // getApi('todos').then((data)=> setTasks(data))
        getApi('users').then((data)=> setUsers(data))
        // getApi('posts').then((data)=> console.log(data))
    },[])


    return (
        <>
            {/*<User users={users}/>*/}
            {/*<Button title={'FETCH'} action={getTodos}/>*/}
            <Button title={'LocalStorage'} action={sendLocalStorage}/>
            <Button title={'GetLocalStorage'} action={getLocalStorage}/>
            {show &&
                <Modal handleShow={handleShow}
                       onChangeInputTask={onChangeInputTask}
                       handleAdd={handleAdd}
                >
                    {/*<input type="text"*/}
                    {/*onChange={(event=> setInputValue(event.target.value))}*/}
                    {/*/>*/}
                </Modal>
            }

            <TodoList
                tasks={tasks}
                handleDelete={handleDelete}
                handleDone={handleDone}
                handleEdit={handleEdit}
            />
            {/*<Buttons/>*/}
            <Button title={'Открыть'} action={handleShow}/>
            {/*<Header navBar={navBar}/>*/}
            {/*<User name={'Bakyt'} age={18}/>*/}
            {/*<User name={'Kuban'} age={30}/>*/}
            {/*<User name={'Ermek'} age={10}/>*/}
            {/*<Input/>*/}
            {/*<Example>*/}
            {/*    <p style={{color: 'red', fontSize: '20px'}} >User</p>*/}
            {/*    <p>Age</p>*/}
            {/*</Example>*/}
        </>
    );
};

export default MainPage;