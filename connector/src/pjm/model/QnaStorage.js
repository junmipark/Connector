import ItemStorage from "./ItemStorage";
import QuestionItem from "./QuestionItem";
import AnswerItem from "./AnswerItem";
import Item from "./Item";

class QnaStorage extends ItemStorage {
    constructor() {
        super();
    }

    createQuestion(data) {
        const question = new QuestionItem({ ...data, 'id': this.count++ });
        try {
            this.list.push(question);
        } catch {
            return false;
        }
        return true;
    }

    updateQuestion(data) {
        try {
            if (this.currentIndex !== -1) {
                const currentQuestion = this.list[this.currentIndex];
                const newQuestion = { ...currentQuestion, 'data': { ...data, 'id': currentQuestion.data.id }, 'modifiedDate': new Item().getCurrentDate() };
                this.list[this.currentIndex] = newQuestion;
            }
        } catch {
            return false
        } return true;
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

    createAnswer(data) {
        try {

            if (this.currentIndex !== -1) {
                const currentQuestion = this.list[this.currentIndex];
                const questionId = currentQuestion.id;
                const newAnswer = new AnswerItem({ ...data, 'id': currentQuestion.answerCount++ }, questionId);
                currentQuestion.answerList.push(newAnswer);
                this.list[this.currentIndex] = currentQuestion;
            }
        } catch {
            return false;
        } return true;
    }

    updateAnswer(data, answerIndex) {
        try {
            if (this.currentIndex !== -1) {
                const currentQuestion = this.list[this.currentIndex];
                const currentAnswer = currentQuestion.answerList[answerIndex];
                const newAnswer = { ...currentAnswer, 'data': { ...data, 'id': currentAnswer.data.id }, 'modifiedDate': new Item().getCurrentDate() };
                currentQuestion.answerList[answerIndex] = newAnswer;
            }
        } catch {
            return false;
        } return true;
    }

    deleteAnswer(answerIndex) {
        try {
            if (this.currentIndex !== -1) {
                const currentQuestion = this.list[this.currentIndex];
                currentQuestion.answerList.splice(answerIndex, 1);

            }
        } catch {
            return false;
        } return true;
    }
}

export default QnaStorage;