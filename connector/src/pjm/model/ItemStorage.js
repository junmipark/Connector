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

    setIndexDefault() {
        this.currentIndex = -1;
    }

    setCurrentIndex(index) {
        if (index >= 0 && index < this.list.length) {
            this.currentIndex = index;
        }
    }

    createItem(data) {
        const boardItem = new Item({ ...data, 'id': this.count++ });
        this.list.push(boardItem);
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