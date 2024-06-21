import React from "react";

class Item extends React.Component {
    constructor(data) {
        super();
        this.data = data;
        this.createdDate = this.getCurrentDate();
        this.modifiedDate = this.getCurrentDate();
    }

    getCurrentDate() {
        return new Date().toLocaleString('ko-KR');
    }
}

class ItemStorage extends React.Component {
    constructor(item) {
        super();
        this.list = [];
        this.count = 0;
        this.currentIndex = -1;
    }

    setList(list) {
        if (Array.isArray(list) && list.length > 0) {
            this.list = list;
        }
    }

    createItem(data) {
        const boardItem = new Item({ ...data, 'id': this.count++ });
        this.list.push(boardItem);
    }

    setCurrentIndex(index) {
        if (index >= 0 && index < this.list.length) {
            this.currentIndex = index;
        }
    }

    updateItem(data) {
        if (this.currentIndex !== -1) {
            let newItem = new Item(data);
            newItem = { ...newItem, createdDate: this.list[this.currentIndex].createdDate }
            this.list[this.currentIndex] = newItem;
        }
    }

    deleteItem() {
        if (this.currentIndex !== -1) {
            this.list.splice(this.currentIndex, 1);
            this.currentIndex = -1;
        }
    }

    getItem() {
        let result;

        if (this.currentIndex !== -1) {
            result = this.list[this.currentIndex];

            return result;
        }

        return null;
    }
}

export default ItemStorage;