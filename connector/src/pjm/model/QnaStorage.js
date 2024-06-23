import ItemStorage from "./ItemStorage";
import QuestionItem from "./QuestionItem";
import AnswerItem from "./AnswerItem";

class QnaStorage extends ItemStorage {
    constructor() {
        super();
    }

    createQuestion(data) {
        const question = new QuestionItem({ ...data, 'id': this.count++ });
        this.list.push(question);
    }

    updateQuestion(data) {
        if (this.currentIndex !== -1) {
            let newQuestion = new QuestionItem(data);
            newQuestion = { ...newQuestion, createdDate: this.list[this.currentIndex].createdDate }
            this.list[this.currentIndex] = newQuestion;
        }
    }

    deleteQuestion() {
        if (this.currentIndex !== -1) {
            this.list.splice(this.currentIndex, 1);
            this.currentIndex = -1;
        }
    }

    createAnswer(data) {
        if (this.currentIndex !== -1) {
            const currentQuestion = this.list[this.currentIndex];
            const questionId = currentQuestion.id;
            const newAnswer = new AnswerItem(data, questionId);
            if (currentQuestion.addAnswerItem(newAnswer)) {
                this.list[this.currentIndex] = currentQuestion;
            }
        }
    }

    updateAnswer(data, answerIndex) {
        if (this.currentIndex !== -1) {
            const currentQuestion = this.list[this.currentIndex];
            const newAnswer = currentQuestion.removeAnswerItem(answerIndex);
            newAnswer.setData(data);
            currentQuestion.addAnswerItem(newAnswer);
        }
    }

    deleteAnswer(answerIndex) {
        if (this.currentIndex !== -1) {
            const currentQuestion = this.list[this.currentIndex];
            currentQuestion.removeAnswerItem(answerIndex);
        }
    }
}

export default QnaStorage;