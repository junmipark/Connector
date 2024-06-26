import Item from "./Item";

class ItemStorage {
    constructor() {
        this.list = [];
        this.count = 0;
        this.currentIndex = -1;
    }

    setList(list) {
        if (Array.isArray(list) && list.length > 0) {
            this.list = list;
        }
    }

    setCount(count) {
        this.count = count;
    }

    setIndexDefault() {
        this.currentIndex = -1;
    }

    setCurrentIndex(index) {
        if (index >= 0 && index < this.list.length) {
            this.currentIndex = index;
        }
    }

    createItem(data) {
        let newItem = new Item(data);
        newItem = { ...newItem, 'id': this.count++ }
        this.list.push(newItem);
    }

    updateItem(data) {
        if (this.currentIndex !== -1) {
            const currentItem = this.list[this.currentIndex];
            let newItem = { ...currentItem, 'data': data, 'modifiedDate': new Item().getCurrentDate() }
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