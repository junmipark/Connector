import ItemStorage from "./ItemStorage";
import QuestionItem from "./QuestionItem";
import AnswerItem from "./AnswerItem";
import Item from "./Item";

class QnaStorage extends ItemStorage {
    constructor() {
        super();
        this.tags = new Set();
    }

    /**
     * 질문 게시글 CRUD
     */
    createQuestion(data) {
        let question = new QuestionItem(data);
        question = { ...question, 'id': this.count++ }
        try {
            this.list.push(question);
            this.setTags(data.tags);
        } catch {
            return false;
        }
        return true;
    }

    updateQuestion(data) {
        try {
            if (this.currentIndex !== -1) {
                const currentQuestion = this.list[this.currentIndex];
                const newQuestion = { ...currentQuestion, 'data': data, 'modifiedDate': new Item().getCurrentDate() };
                this.list[this.currentIndex] = newQuestion;
                this.setTags(data.tags);
            }
        } catch {
            return false
        }
        return true;
    }

    deleteQuestion() {
        try {
            if (this.currentIndex !== -1) {
                this.list.splice(this.currentIndex, 1);
                this.currentIndex = -1;
            }
        } catch {
            return false;
        }
        return true;
    }

    /**
     * 답변 게시글 CRUD
     */

    createAnswer(data) {
        try {
            if (this.currentIndex !== -1) {
                const currentQuestion = this.list[this.currentIndex];
                const questionId = currentQuestion.id;
                let newAnswer = new AnswerItem(data, questionId);
                newAnswer = { ...newAnswer, id: currentQuestion.answerCount++ }
                currentQuestion.answerList.push(newAnswer);
                this.list[this.currentIndex] = currentQuestion;
            }
        } catch {
            return false;
        }
        return true;
    }

    updateAnswer(data, answerIndex) {
        try {
            if (this.currentIndex !== -1) {
                const currentQuestion = this.list[this.currentIndex];
                const currentAnswer = currentQuestion.answerList[answerIndex];
                const newAnswer = { ...currentAnswer, 'data': data, 'modifiedDate': new Item().getCurrentDate() };
                currentQuestion.answerList[answerIndex] = newAnswer;
            }
        } catch {
            return false;
        }
        return true;
    }

    deleteAnswer(answerIndex) {
        try {
            if (this.currentIndex !== -1) {
                const currentQuestion = this.list[this.currentIndex];
                currentQuestion.answerList.splice(answerIndex, 1);

            }
        } catch {
            return false;
        }
        return true;
    }

    /**
     * 상단에 표시되는 태그들
     */
    setTags(tags) {
        tags.forEach(tag => {
            this.tags.add(tag);
        });
    }

    getTags() {
        return Array.from(this.tags);
    }
}

export default QnaStorage;