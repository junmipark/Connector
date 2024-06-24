/**
 * [ Item ]
 * QnA에서 Q와 A 공통으로 공유되는 구조를 정의
 */

class Item {
    constructor(data) {
        this.data = data;
        this.createdDate = this.getCurrentDate();
        this.modifiedDate = this.getCurrentDate();
    }

    getCurrentDate() {
        return new Date().toLocaleString('ko-KR');
    }
}

export default Item;