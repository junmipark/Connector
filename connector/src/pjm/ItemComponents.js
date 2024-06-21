import React from "react";

class Item extends React.Component {
    constructor(item) {
        super();
        this.item = item;
        this.createdDate = this.setCurrentDate();
        this.modifiedDate = this.setCurrentDate();
    }

    setModifiedDate() {
        this.modifiedDate = this.setCurrentDate();
    }

    setCurrentDate() {
        return new Date().toLocaleString('ko-KR');
    }
}

class ItemList extends React.Component {
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

    createItem(item) {
        const boardItem = new Item({ ...item, 'id': this.count++ });
        this.list.push(boardItem);
    }

    setCurrentIndex(index) {
        if (index >= 0 && index < this.list.length) {
            this.currentIndex = index;
        }
    }

    updateItem(oldItem) {
        if (this.currentIndex !== -1) {
            let newItem = {
                item: oldItem.item,
                createdDate: oldItem.createdDate,
            };

            newItem.setModifiedDate();

            this.list[this.currentIndex] = newItem;
        }
    }

    deleteItem() {
        if (this.currentIndex !== -1) {
            this.list.splice(this.currentIndex, 1);
            this.currentIndex = -1;
        }
    }
}

export default ItemList;