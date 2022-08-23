import React from 'react';
import './index.css';
import TodoItem from './TodoItem';

export default class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            lastId: 0,
        };
        this.title = React.createRef();
        this.priority = React.createRef();
        this.description = React.createRef();
        this.error = React.createRef();
        this.id = React.createRef();
        this.save = React.createRef();
        this.cancel = React.createRef();
        this.form = React.createRef();
    }

    render() {
        return (
            <div className='todoListWrap'>
                <h1>Todo List</h1>
                <form ref={this.form}>
                    <h2>Add new item</h2>
                    <div className='error' ref={this.error}></div>
                    <div className="row">
                        <label><strong>Title:</strong></label>
                        <input type="text" ref={this.title} />
                    </div>
                    <div className="row">
                        <label><strong>Priority:</strong></label>
                        <select ref={this.priority}>
                            <option value="">Please select...</option>
                            <option value="low">low</option>
                            <option value="medium">medium</option>
                            <option value="high">high</option>
                        </select>
                    </div>
                    <div className="row">
                        <label>
                            <strong>Description:</strong><br />
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
                        </label>
                        <textarea ref={this.description}></textarea>
                    </div>
                    <div className="row">
                        <button type='button' className='save' ref={this.save} onClick={() => this.doAddUpdate()}><strong>Add New Item</strong></button>
                        <button type='button' className='cancel' ref={this.cancel} onClick={() => this.doCancel()}><strong>Cancel</strong></button>
                    </div>
                    <input type="hidden" value="" ref={this.id} />
                </form>
                <div className="items-wrap">
                    <h2>Todo Items</h2>
                    <table>
                        <thead>
                            <tr>
                                <th><strong>Title</strong></th>
                                <th><strong>Description</strong></th>
                                <th><strong>Priority</strong></th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.items.length > 0 && this.state.items.map(item => <TodoItem value={item} key={item.id} />)}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    doAddUpdate = () => {
        if (this.title.current.value.length &&
            this.description.current.value.length &&
            this.priority.current.value.length) {
            let items = [];
            if (this.id.current.value === undefined ||
                this.id.current.value === null ||
                this.id.current.value.length === 0) {
                items = this.doAdd();
            }
            else {
                items = this.doUpdate();
            }
            this.setState({
                items: items
            });
            this.doCancel();
        }
        else {
            this.error.current.innerText = 'Please fill in all fields';
        }
    }

    doAdd() {
        let lastId = this.state.lastId + 1;
        let item = {
            title: this.title.current.value,
            description: this.description.current.value,
            priority: this.priority.current.value,
            id: this.id.current.value.length ? parseInt(this.id.current.value) : lastId,
            edit: this.doEdit,
            delete: this.doDelete
        }
        this.setState({
            lastId: lastId
        });
        let items = this.state.items.concat(item);
        return items;
    }

    doUpdate() {
        let item = this.getItemById(parseInt(this.id.current.value));
        item.title = this.title.current.value;
        item.description = this.description.current.value;
        item.priority = this.priority.current.value;
        item.id = this.id.current.value;
        let items = this.state.items.slice();
        const itemIndex = items.findIndex(item => items.id === this.id.current.value);
        items.splice(itemIndex, 1, item);
        return items;
    }

    doEdit = (e) => {
        let id = this.getRowId(e.target);
        let item = this.getItemById(id);
        this.title.current.value = item.title;
        this.description.current.value = item.description;
        this.priority.current.value = item.priority;
        this.id.current.value = item.id;
        this.save.current.innerText = "Save Item";
    }

    doDelete = (e) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            let id = this.getRowId(e.target);
            let items = this.getItemsExcludeById(id);
            this.setState({
                items: items
            });
        }
    }

    doCancel() {
        this.form.current.reset();
        this.id.current.value = "";
        this.save.current.innerHTML = "<strong>Add New Item</strong>";
        this.error.current.innerText = '';
    }

    getRowId(el) {
        return parseInt(el.closest('tr').getAttribute('id'));
    }

    getItemById(id) {
        return this.state.items.slice().filter(item => item.id === id)[0];
    }

    getItemsExcludeById(id) {
        return this.state.items.slice().filter(item => item.id !== id);
    }
}