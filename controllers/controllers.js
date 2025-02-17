
import { UsersController } from "./UsersController.js";
import { CoursesController } from "./CoursesController.js";
import { LessonsController } from "./LessonsController.js";
import { ProgressController } from "./ProgressController.js";
import { LibraryController } from "./LibraryController.js";
import { BookmarksController } from "./BookmarksController.js";
import { EnrollmentController } from "./EnrollmentsController.js";
import { QuizzesController } from "./QuizzesController.js";
import { FeedbackController } from "./FeedbackController.js";

import { User, Course, Lesson, Progress, Library, Bookmark, Enrollment} from "../models/schemas.js";

const usersController = new UsersController();
const coursesController = new CoursesController();
const lessonsController = new LessonsController();
const progressController = new ProgressController();
const libraryController = new LibraryController();
const bookmarksController = new BookmarksController();
const enrollmentController = new EnrollmentController();
const quizzesController = new QuizzesController();
const feedbackController = new FeedbackController();

// Tworzenie domyślnych danych
const adminDb = await usersController.createUser({
    name: "Admin",
    surname: "Admin",
    password: "test",
    email: "admin@example.com",
    role: "admin"
});

const teacherDb = await usersController.createUser({
    name: "Jan",
    surname: "Janowski",
    email: "nauczyciel1@example.com",
    password: "test",
    role: "teacher"
});

const teacherDb2 = await usersController.createUser({
    name: "Marek",
    surname: "Markowski",
    email: "nauczyciel2@example.com",
    password: "test",
    role: "teacher"
});

const studentDb1 = await usersController.createUser({
    name: "Alicja",
    surname: "Kowalska",
    email: "alicja@example.com",
    password: "test",
    role: "student"
});

const studentDb2 = await usersController.createUser({
    name: "Bob",
    surname: "Bob",
    email: "bob@example.com",
    password: "test",
    role: "student"
});

// Wszystkie akordy
const chord1 = await libraryController.createEntry({ 
    name: "A-dur", 
    type: "chord", 
    imagePath: "/resources/images/Akord_A_Dur.png", 
    description: "Akord A-dur" 
});
const chord2 = await libraryController.createEntry({ 
    name: "A-moll", 
    type: "chord", 
    imagePath: "/resources/images/Akord_A_Mol.png", 
    description: "Akord A-moll" 
});
const chord3 = await libraryController.createEntry({ 
    name: "A7", 
    type: "chord", 
    imagePath: "/resources/images/Akord_A7.png", 
    description: "Akord A7" 
});

const chord4 = await libraryController.createEntry({ 
    name: "B-dur", 
    type: "chord", 
    imagePath: "/resources/images/Akord_B_Dur.png", 
    description: "Akord B-dur" 
});
const chord5 = await libraryController.createEntry({ 
    name: "B-moll", 
    type: "chord", 
    imagePath: "/resources/images/Akord_B_Mol.png", 
    description: "Akord B-moll" 
});
const chord6 = await libraryController.createEntry({ 
    name: "B7", 
    type: "chord", 
    imagePath: "/resources/images/Akord_B7.png", 
    description: "Akord B7" 
});

const chord7 = await libraryController.createEntry({ 
    name: "C-dur", 
    type: "chord", 
    imagePath: "/resources/images/Akord_C_Dur.png", 
    description: "Akord C-dur" 
});
const chord8 = await libraryController.createEntry({ 
    name: "C-moll", 
    type: "chord", 
    imagePath: "/resources/images/Akord_C_Mol.png", 
    description: "Akord C-moll" 
});
const chord9 = await libraryController.createEntry({ 
    name: "C7", 
    type: "chord", 
    imagePath: "/resources/images/Akord_C7.png", 
    description: "Akord C7" 
});
const chord10 = await libraryController.createEntry({ 
    name: "Cadd9", 
    type: "chord", 
    imagePath: "/resources/images/Akord_Cadd9.png", 
    description: "Akord Cadd9" 
});

const chord11 = await libraryController.createEntry({ 
    name: "D-dur", 
    type: "chord", 
    imagePath: "/resources/images/Akord_D_Dur.png", 
    description: "Akord D-dur" 
});
const chord12 = await libraryController.createEntry({ 
    name: "D-moll", 
    type: "chord", 
    imagePath: "/resources/images/Akord_D_Mol.png", 
    description: "Akord D-moll" 
});
const chord13 = await libraryController.createEntry({ 
    name: "D7", 
    type: "chord", 
    imagePath: "/resources/images/Akord_D7.png", 
    description: "Akord D7" 
});
const chord14 = await libraryController.createEntry({ 
    name: "D/F#", 
    type: "chord", 
    imagePath: "/resources/images/Akord_D_Fs.png", 
    description: "Akord D/F#" 
});

const chord15 = await libraryController.createEntry({ 
    name: "E-dur", 
    type: "chord", 
    imagePath: "/resources/images/Akord_E_Dur.png", 
    description: "Akord E-dur" 
});
const chord16 = await libraryController.createEntry({ 
    name: "E-moll", 
    type: "chord", 
    imagePath: "/resources/images/Akord_E_Mol.png", 
    description: "Akord E-moll" 
});
const chord17 = await libraryController.createEntry({ 
    name: "E7", 
    type: "chord", 
    imagePath: "/resources/images/Akord_E7.png", 
    description: "Akord E7" 
});

const chord18 = await libraryController.createEntry({ 
    name: "F-dur", 
    type: "chord", 
    imagePath: "/resources/images/Akord_F_Dur.png", 
    description: "Akord F-dur" 
});
const chord19 = await libraryController.createEntry({ 
    name: "F-moll", 
    type: "chord", 
    imagePath: "/resources/images/Akord_F_Moll.png", 
    description: "Akord F-moll" 
});
const chord20 = await libraryController.createEntry({ 
    name: "F7", 
    type: "chord", 
    imagePath: "/resources/images/Akord_F7.png", 
    description: "Akord F7" 
});

const chord21 = await libraryController.createEntry({ 
    name: "G-dur", 
    type: "chord", 
    imagePath: "/resources/images/Akord_G_Dur.png", 
    description: "Akord G-dur" 
});
const chord22 = await libraryController.createEntry({ 
    name: "G-moll", 
    type: "chord", 
    imagePath: "/resources/images/Akord_G_Mol.png", 
    description: "Akord G-moll" 
});
const chord23 = await libraryController.createEntry({ 
    name: "G7", 
    type: "chord", 
    imagePath: "/resources/images/Akord_G7.png", 
    description: "Akord G7" 
});
const chord24 = await libraryController.createEntry({ 
    name: "Gsus4", 
    type: "chord", 
    imagePath: "/resources/images/Akord_Gsus4.png", 
    description: "Akord Gsus4" 
});


// Wszystkie skale
const scale1 = await libraryController.createEntry({
    name: "Skala E-moll",
    type: "scale",
    imagePath: "/resources/images/Skala_E_moll.PNG",
    description: "Skala E-moll"
});
const scale2 = await libraryController.createEntry({
    name: "Skala E-dur",
    type: "scale",
    imagePath: "/resources/images/Skala_E_dur.PNG",
    description: "Skala E-dur"
});

const scale3 = await libraryController.createEntry({
    name: "Skala F-moll",
    type: "scale",
    imagePath: "/resources/images/Skala_F_moll.PNG",
    description: "Skala F-moll"
});
const scale4 = await libraryController.createEntry({
    name: "Skala F-dur",
    type: "scale",
    imagePath: "/resources/images/Skala_F_dur.PNG",
    description: "Skala F-dur"
});

const scale5 = await libraryController.createEntry({
    name: "Skala Fis-moll",
    type: "scale",
    imagePath: "/resources/images/Skala_Fis_moll.PNG",
    description: "Skala Fis-moll"
});
const scale6 = await libraryController.createEntry({
    name: "Skala Fis-dur",
    type: "scale",
    imagePath: "/resources/images/Skala_Fis_dur.PNG",
    description: "Skala Fis-dur"
});

const scale7 = await libraryController.createEntry({
    name: "Skala G-moll",
    type: "scale",
    imagePath: "/resources/images/Skala_G_moll.PNG",
    description: "Skala G-moll"
});
const scale8 = await libraryController.createEntry({
    name: "Skala G-dur",
    type: "scale",
    imagePath: "/resources/images/Skala_G_dur.PNG",
    description: "Skala G-dur"
});

const scale9 = await libraryController.createEntry({
    name: "Skala Gis-moll",
    type: "scale",
    imagePath: "/resources/images/Skala_Gis_moll.PNG",
    description: "Skala Gis-moll"
});
const scale10 = await libraryController.createEntry({
    name: "Skala Gis-dur",
    type: "scale",
    imagePath: "/resources/images/Skala_Gis_dur.PNG",
    description: "Skala Gis-dur"
});

const scale11 = await libraryController.createEntry({
    name: "Skala A-moll",
    type: "scale",
    imagePath: "/resources/images/Skala_A_moll.PNG",
    description: "Skala A-moll"
});
const scale12 = await libraryController.createEntry({
    name: "Skala A-dur",
    type: "scale",
    imagePath: "/resources/images/Skala_A_dur.PNG",
    description: "Skala A-dur"
});

const scale13 = await libraryController.createEntry({
    name: "Skala Ais-moll",
    type: "scale",
    imagePath: "/resources/images/Skala_Ais_moll.PNG",
    description: "Skala Ais-moll"
});
const scale14 = await libraryController.createEntry({
    name: "Skala Ais-dur",
    type: "scale",
    imagePath: "/resources/images/Skala_Ais_dur.PNG",
    description: "Skala Ais-dur"
});

const scale15 = await libraryController.createEntry({
    name: "Skala B-moll",
    type: "scale",
    imagePath: "/resources/images/Skala_B_moll.PNG",
    description: "Skala B-moll"
});
const scale16 = await libraryController.createEntry({
    name: "Skala B-dur",
    type: "scale",
    imagePath: "/resources/images/Skala_B_dur.PNG",
    description: "Skala B-dur"
});

const scale17 = await libraryController.createEntry({
    name: "Skala C-moll",
    type: "scale",
    imagePath: "/resources/images/Skala_C_moll.PNG",
    description: "Skala C-moll"
});
const scale18 = await libraryController.createEntry({
    name: "Skala C-dur",
    type: "scale",
    imagePath: "/resources/images/Skala_C_dur.PNG",
    description: "Skala C-dur"
});

const scale19 = await libraryController.createEntry({
    name: "Skala Cis-moll",
    type: "scale",
    imagePath: "/resources/images/Skala_Cis_moll.PNG",
    description: "Skala Cis-moll"
});
const scale20 = await libraryController.createEntry({
    name: "Skala Cis-dur",
    type: "scale",
    imagePath: "/resources/images/Skala_Cis_dur.PNG",
    description: "Skala Cis-dur"
});

const scale21 = await libraryController.createEntry({
    name: "Skala D-moll",
    type: "scale",
    imagePath: "/resources/images/Skala_D_moll.PNG",
    description: "Skala D-moll"
});
const scale22 = await libraryController.createEntry({
    name: "Skala D-dur",
    type: "scale",
    imagePath: "/resources/images/Skala_D_dur.PNG",
    description: "Skala D-dur"
});

const scale23 = await libraryController.createEntry({
    name: "Skala Dis-moll",
    type: "scale",
    imagePath: "/resources/images/Skala_Dis_moll.PNG",
    description: "Skala Dis-moll"
});
const scale24 = await libraryController.createEntry({
    name: "Skala Dis-dur",
    type: "scale",
    imagePath: "/resources/images/Skala_Dis_dur.PNG",
    description: "Skala Dis-dur"
});


// Quizy
const initializeQuizzes = async () => {
    // Quiz 1
    const quiz1 = await quizzesController.createQuiz({
        title: "Podstawy gry na gitarze",
        description: "Sprawdź swoją wiedzę na temat podstawowych technik gry na gitarze."
    });

    const question1_1 = await quizzesController.addQuestionToQuiz(quiz1.id, {
        question_text: "Która ręka na gitarze klasycznej odpowiada za dociskanie strun?",
    });
    await quizzesController.addAnswerToQuestion(question1_1.id, { answer_text: "Prawa", is_correct: false });
    await quizzesController.addAnswerToQuestion(question1_1.id, { answer_text: "Lewa", is_correct: true });
    await quizzesController.addAnswerToQuestion(question1_1.id, { answer_text: "Obie jednocześnie", is_correct: false });

    const question2_1 = await quizzesController.addQuestionToQuiz(quiz1.id, {
        question_text: "Co oznacza technika 'hammer-on'?",
    });
    await quizzesController.addAnswerToQuestion(question2_1.id, { answer_text: "Przeciągnięcie palca po strunie", is_correct: false });
    await quizzesController.addAnswerToQuestion(question2_1.id, { answer_text: "Uderzenie palcem w próg bez kostkowania", is_correct: true });
    await quizzesController.addAnswerToQuestion(question2_1.id, { answer_text: "Szybkie przesunięcie ręki po gryfie", is_correct: false });

    const question3_1 = await quizzesController.addQuestionToQuiz(quiz1.id, {
        question_text: "Który z poniższych akordów jest akordem durowym?",
    });
    await quizzesController.addAnswerToQuestion(question3_1.id, { answer_text: "A-moll", is_correct: false });
    await quizzesController.addAnswerToQuestion(question3_1.id, { answer_text: "C-dur", is_correct: true });
    await quizzesController.addAnswerToQuestion(question3_1.id, { answer_text: "E-moll", is_correct: false });

    const question4_1 = await quizzesController.addQuestionToQuiz(quiz1.id, {
        question_text: "Ile strun ma standardowa gitara elektryczna?",
    });
    await quizzesController.addAnswerToQuestion(question4_1.id, { answer_text: "5", is_correct: false });
    await quizzesController.addAnswerToQuestion(question4_1.id, { answer_text: "6", is_correct: true });
    await quizzesController.addAnswerToQuestion(question4_1.id, { answer_text: "7", is_correct: false });

    const question5_1 = await quizzesController.addQuestionToQuiz(quiz1.id, {
        question_text: "Jak nazywa się technika tłumienia strun dłonią?",
    });
    await quizzesController.addAnswerToQuestion(question5_1.id, { answer_text: "Sweep Picking", is_correct: false });
    await quizzesController.addAnswerToQuestion(question5_1.id, { answer_text: "Palm Muting", is_correct: true });
    await quizzesController.addAnswerToQuestion(question5_1.id, { answer_text: "Slide", is_correct: false });

    console.log("Quiz 1 initialized.");

    // Quiz 2
    const quiz2 = await quizzesController.createQuiz({
        title: "Akordy i teoria muzyki",
        description: "Sprawdź swoją wiedzę na temat podstawowych akordów i ich budowy."
    });

    const question1_2 = await quizzesController.addQuestionToQuiz(quiz2.id, {
        question_text: "Który z poniższych akordów jest akordem molowym?",
    });
    await quizzesController.addAnswerToQuestion(question1_2.id, { answer_text: "C-dur", is_correct: false });
    await quizzesController.addAnswerToQuestion(question1_2.id, { answer_text: "A-moll", is_correct: true });
    await quizzesController.addAnswerToQuestion(question1_2.id, { answer_text: "G-dur", is_correct: false });

    const question2_2 = await quizzesController.addQuestionToQuiz(quiz2.id, {
        question_text: "Ile półtonów dzieli kwintę czystą?",
    });
    await quizzesController.addAnswerToQuestion(question2_2.id, { answer_text: "7", is_correct: true });
    await quizzesController.addAnswerToQuestion(question2_2.id, { answer_text: "5", is_correct: false });
    await quizzesController.addAnswerToQuestion(question2_2.id, { answer_text: "4", is_correct: false });

    const question3_2 = await quizzesController.addQuestionToQuiz(quiz2.id, {
        question_text: "Jaki akord powstanie po dodaniu septymy do C-dur?",
    });
    await quizzesController.addAnswerToQuestion(question3_2.id, { answer_text: "Cmaj7", is_correct: true });
    await quizzesController.addAnswerToQuestion(question3_2.id, { answer_text: "Cadd9", is_correct: false });
    await quizzesController.addAnswerToQuestion(question3_2.id, { answer_text: "Cm7", is_correct: false });

    const question4_2 = await quizzesController.addQuestionToQuiz(quiz2.id, {
        question_text: "Która progresja akordowa jest jedną z najczęściej używanych?",
    });
    await quizzesController.addAnswerToQuestion(question4_2.id, { answer_text: "I - V - vi - IV", is_correct: true });
    await quizzesController.addAnswerToQuestion(question4_2.id, { answer_text: "I - III - IV - VII", is_correct: false });
    await quizzesController.addAnswerToQuestion(question4_2.id, { answer_text: "V - IV - I - II", is_correct: false });

    const question5_2 = await quizzesController.addQuestionToQuiz(quiz2.id, {
        question_text: "W jakiej tonacji nie ma krzyżyków ani bemoli?",
    });
    await quizzesController.addAnswerToQuestion(question5_2.id, { answer_text: "C-dur", is_correct: true });
    await quizzesController.addAnswerToQuestion(question5_2.id, { answer_text: "D-dur", is_correct: false });
    await quizzesController.addAnswerToQuestion(question5_2.id, { answer_text: "E-moll", is_correct: false });

    console.log("Quiz 2 initialized.");

    // Quiz 3
    const quiz3 = await quizzesController.createQuiz({
        title: "Historia muzyki gitarowej",
        description: "Sprawdź swoją wiedzę o słynnych gitarzystach i historii muzyki gitarowej."
    });

    const question1_3 = await quizzesController.addQuestionToQuiz(quiz3.id, {
        question_text: "Kto jest uznawany za jednego z największych gitarzystów wszech czasów?",
    });
    await quizzesController.addAnswerToQuestion(question1_3.id, { answer_text: "Jimi Hendrix", is_correct: true });
    await quizzesController.addAnswerToQuestion(question1_3.id, { answer_text: "Robert Plant", is_correct: false });
    await quizzesController.addAnswerToQuestion(question1_3.id, { answer_text: "Cliff Burton", is_correct: false });

    const question2_3 = await quizzesController.addQuestionToQuiz(quiz3.id, {
        question_text: "Z jakim zespołem najbardziej kojarzony jest Eric Clapton?",
    });
    await quizzesController.addAnswerToQuestion(question2_3.id, { answer_text: "Cream", is_correct: true });
    await quizzesController.addAnswerToQuestion(question2_3.id, { answer_text: "The Rolling Stones", is_correct: false });
    await quizzesController.addAnswerToQuestion(question2_3.id, { answer_text: "The Beatles", is_correct: false });

    const question3_3 = await quizzesController.addQuestionToQuiz(quiz3.id, {
        question_text: "Który gitarzysta słynął z gry tappingiem dwuręcznym?",
    });
    await quizzesController.addAnswerToQuestion(question3_3.id, { answer_text: "Eddie Van Halen", is_correct: true });
    await quizzesController.addAnswerToQuestion(question3_3.id, { answer_text: "Slash", is_correct: false });
    await quizzesController.addAnswerToQuestion(question3_3.id, { answer_text: "Carlos Santana", is_correct: false });

    const question4_3 = await quizzesController.addQuestionToQuiz(quiz3.id, {
        question_text: "Który gitarzysta używał pseudonimu 'Slowhand'?",
    });
    await quizzesController.addAnswerToQuestion(question4_3.id, { answer_text: "Eric Clapton", is_correct: true });
    await quizzesController.addAnswerToQuestion(question4_3.id, { answer_text: "Jimmy Page", is_correct: false });
    await quizzesController.addAnswerToQuestion(question4_3.id, { answer_text: "David Gilmour", is_correct: false });

    const question5_3 = await quizzesController.addQuestionToQuiz(quiz3.id, {
        question_text: "Która marka jest znana z kultowego modelu gitary 'Les Paul'?",
    });
    await quizzesController.addAnswerToQuestion(question5_3.id, { answer_text: "Gibson", is_correct: true });
    await quizzesController.addAnswerToQuestion(question5_3.id, { answer_text: "Fender", is_correct: false });
    await quizzesController.addAnswerToQuestion(question5_3.id, { answer_text: "Ibanez", is_correct: false });

    console.log("Quiz 3 initialized.");
    
    // Quiz 4
    const quiz4 = await quizzesController.createQuiz({
        title: "Techniki gitarowe",
        description: "Sprawdź swoją wiedzę na temat zaawansowanych technik gry na gitarze."
    });

    const question1_4 = await quizzesController.addQuestionToQuiz(quiz4.id, {
        question_text: "Na czym polega technika 'sweep picking'?",
    });
    await quizzesController.addAnswerToQuestion(question1_4.id, { answer_text: "Na płynnym przesuwaniu kostki po kilku strunach", is_correct: true });
    await quizzesController.addAnswerToQuestion(question1_4.id, { answer_text: "Na szybkim przesuwaniu ręki po gryfie", is_correct: false });
    await quizzesController.addAnswerToQuestion(question1_4.id, { answer_text: "Na tłumieniu strun dłonią", is_correct: false });

    const question2_4 = await quizzesController.addQuestionToQuiz(quiz4.id, {
        question_text: "Czym jest tapping?",
    });
    await quizzesController.addAnswerToQuestion(question2_4.id, { answer_text: "Techniką polegającą na szybkim dociskaniu strun palcem prawej ręki", is_correct: true });
    await quizzesController.addAnswerToQuestion(question2_4.id, { answer_text: "Techniką tłumienia strun dłonią", is_correct: false });
    await quizzesController.addAnswerToQuestion(question2_4.id, { answer_text: "Rodzajem strojenia gitary", is_correct: false });

    const question3_4 = await quizzesController.addQuestionToQuiz(quiz4.id, {
        question_text: "Jakie są główne elementy techniki legato?",
    });
    await quizzesController.addAnswerToQuestion(question3_4.id, { answer_text: "Hammer-ony i pull-offy", is_correct: true });
    await quizzesController.addAnswerToQuestion(question3_4.id, { answer_text: "Slide i podciąganie", is_correct: false });
    await quizzesController.addAnswerToQuestion(question3_4.id, { answer_text: "Palm muting i vibrato", is_correct: false });

    const question4_4 = await quizzesController.addQuestionToQuiz(quiz4.id, {
        question_text: "Jak nazywa się technika, w której używa się zarówno kostki, jak i palców do gry?",
    });
    await quizzesController.addAnswerToQuestion(question4_4.id, { answer_text: "Hybrid picking", is_correct: true });
    await quizzesController.addAnswerToQuestion(question4_4.id, { answer_text: "Alternate picking", is_correct: false });
    await quizzesController.addAnswerToQuestion(question4_4.id, { answer_text: "Fingerstyle", is_correct: false });

    const question5_4 = await quizzesController.addQuestionToQuiz(quiz4.id, {
        question_text: "Czym jest 'string skipping'?",
    });
    await quizzesController.addAnswerToQuestion(question5_4.id, { answer_text: "Techniką omijania sąsiednich strun w grze solowej", is_correct: true });
    await quizzesController.addAnswerToQuestion(question5_4.id, { answer_text: "Rodzajem tłumienia dźwięków", is_correct: false });
    await quizzesController.addAnswerToQuestion(question5_4.id, { answer_text: "Techniką grania tylko na pustych strunach", is_correct: false });

    console.log("Quiz 4 initialized.");

    // Quiz 5
    const quiz5 = await quizzesController.createQuiz({
        title: "Strojenie i brzmienie gitary",
        description: "Sprawdź swoją wiedzę na temat strojenia i wpływu brzmienia na muzykę."
    });

    const question1_5 = await quizzesController.addQuestionToQuiz(quiz5.id, {
        question_text: "Jaki jest standardowy strój gitary?",
    });
    await quizzesController.addAnswerToQuestion(question1_5.id, { answer_text: "D G C F A D", is_correct: false });
    await quizzesController.addAnswerToQuestion(question1_5.id, { answer_text: "E A D G B E", is_correct: true });
    await quizzesController.addAnswerToQuestion(question1_5.id, { answer_text: "C G D A E B", is_correct: false });

    const question2_5 = await quizzesController.addQuestionToQuiz(quiz5.id, {
        question_text: "Jak nazywa się technika, w której dźwięk struny jest podnoszony poprzez dociskanie struny w górę?",
    });
    await quizzesController.addAnswerToQuestion(question2_5.id, { answer_text: "Hammer-on", is_correct: false });
    await quizzesController.addAnswerToQuestion(question2_5.id, { answer_text: "Bending", is_correct: true });
    await quizzesController.addAnswerToQuestion(question2_5.id, { answer_text: "Slide", is_correct: false });

    const question3_5 = await quizzesController.addQuestionToQuiz(quiz5.id, {
        question_text: "Który z tych elementów najbardziej wpływa na brzmienie gitary elektrycznej?",
    });
    await quizzesController.addAnswerToQuestion(question3_5.id, { answer_text: "Mostek", is_correct: false });
    await quizzesController.addAnswerToQuestion(question3_5.id, { answer_text: "Przetworniki", is_correct: true });
    await quizzesController.addAnswerToQuestion(question3_5.id, { answer_text: "Główka gryfu", is_correct: false });

    const question4_5 = await quizzesController.addQuestionToQuiz(quiz5.id, {
        question_text: "Która z poniższych opcji jest strojem obniżonym?",
    });
    await quizzesController.addAnswerToQuestion(question4_5.id, { answer_text: "Drop D (D A D G B E)", is_correct: true });
    await quizzesController.addAnswerToQuestion(question4_5.id, { answer_text: "Standard E (E A D G B E)", is_correct: false });
    await quizzesController.addAnswerToQuestion(question4_5.id, { answer_text: "Open G (D G D G B D)", is_correct: false });

    const question5_5 = await quizzesController.addQuestionToQuiz(quiz5.id, {
        question_text: "Co powoduje grubszy zestaw strun w gitarze?",
    });
    await quizzesController.addAnswerToQuestion(question5_5.id, { answer_text: "Wyższe, jaśniejsze brzmienie", is_correct: false });
    await quizzesController.addAnswerToQuestion(question5_5.id, { answer_text: "Głębsze i bardziej basowe brzmienie", is_correct: true });
    await quizzesController.addAnswerToQuestion(question5_5.id, { answer_text: "Nie ma wpływu na brzmienie", is_correct: false });

    console.log("Quiz 5 initialized.");

    // Quiz 6
    const quiz6 = await quizzesController.createQuiz({
        title: "Improwizacja i skale",
        description: "Sprawdź swoją wiedzę na temat improwizacji i skal gitarowych."
    });

    const question1_6 = await quizzesController.addQuestionToQuiz(quiz6.id, {
        question_text: "Która skala jest najczęściej używana w bluesie i rocku?",
    });
    await quizzesController.addAnswerToQuestion(question1_6.id, { answer_text: "Pentatoniczna", is_correct: true });
    await quizzesController.addAnswerToQuestion(question1_6.id, { answer_text: "Chromatyczna", is_correct: false });
    await quizzesController.addAnswerToQuestion(question1_6.id, { answer_text: "Lidyjska", is_correct: false });

    const question2_6 = await quizzesController.addQuestionToQuiz(quiz6.id, {
        question_text: "Jakie są podstawowe stopnie skali durowej?",
    });
    await quizzesController.addAnswerToQuestion(question2_6.id, { answer_text: "Do, Re, Mi, Fa, Sol, La, Ti", is_correct: true });
    await quizzesController.addAnswerToQuestion(question2_6.id, { answer_text: "Do, Mi, Sol, La, Ti, Fa, Re", is_correct: false });
    await quizzesController.addAnswerToQuestion(question2_6.id, { answer_text: "Sol, Do, Re, Mi, Fa, La, Si", is_correct: false });

    const question3_6 = await quizzesController.addQuestionToQuiz(quiz6.id, {
        question_text: "Który z tych trybów muzycznych ma charakter orientalny?",
    });
    await quizzesController.addAnswerToQuestion(question3_6.id, { answer_text: "Tryb frygijski", is_correct: true });
    await quizzesController.addAnswerToQuestion(question3_6.id, { answer_text: "Tryb joński", is_correct: false });
    await quizzesController.addAnswerToQuestion(question3_6.id, { answer_text: "Tryb dorycki", is_correct: false });

    const question4_6 = await quizzesController.addQuestionToQuiz(quiz6.id, {
        question_text: "Która z poniższych technik często stosowana jest w improwizacji gitarowej?",
    });
    await quizzesController.addAnswerToQuestion(question4_6.id, { answer_text: "Bending", is_correct: true });
    await quizzesController.addAnswerToQuestion(question4_6.id, { answer_text: "Palm muting", is_correct: false });
    await quizzesController.addAnswerToQuestion(question4_6.id, { answer_text: "Sweep picking", is_correct: false });

    const question5_6 = await quizzesController.addQuestionToQuiz(quiz6.id, {
        question_text: "Jakie interwały tworzą power chord?",
    });
    await quizzesController.addAnswerToQuestion(question5_6.id, { answer_text: "Pryma i kwinta", is_correct: true });
    await quizzesController.addAnswerToQuestion(question5_6.id, { answer_text: "Tercja i kwinta", is_correct: false });
    await quizzesController.addAnswerToQuestion(question5_6.id, { answer_text: "Kwarta i seksta", is_correct: false });

    console.log("Quiz 6 initialized.");
};
initializeQuizzes();

// Tworzenie kursu 1
const beginnerRhythmCourse = await coursesController.createCourse({
    title: "Podstawy Akordów i Rytmu",
    description: "Naucz się grać akordy i opanuj rytm, który jest kluczowy dla każdego gitarzysty.",
    difficulty: "Początkujący",
}, teacherDb2.id);

// Lekcje dla kursu 1
const lesson1_brc = await lessonsController.createLesson({
    title: "Podstawowe akordy otwarte",
    intro: "Naucz się podstawowych akordów otwartych, które są fundamentem większości piosenek.",
    content: `
Krok 1: Czym są akordy otwarte?  
1. Akordy otwarte to chwyty, przy których co najmniej jedna struna pozostaje otwarta (nie jest przyciskana na żadnym progu).  
2. Dzięki temu dźwięk staje się pełniejszy i często brzmi jaśniej niż w przypadku akordów barowych.  
3. Najpopularniejsze akordy otwarte to: C, G, D, E-moll, A-moll.

Krok 2: Poznaj podstawowe zasady chwytania akordów  
1. Ustaw palce jak najbliżej progów (ale nie na nich), aby uniknąć brzęczenia strun.  
2. Upewnij się, że nie tłumisz przypadkiem innych strun, np. opadającym palcem serdecznym.  
3. Delikatnie dociskaj struny - nie używaj nadmiernej siły, aby nie męczyć dłoni.

Krok 3: Ćwicz zmiany i czystość dźwięków 
1. Wybierz dwa akordy, np. C i G, i ćwicz zmianę między nimi w wolnym tempie.  
2. Upewnij się, że każdy dźwięk brzmi wyraźnie (sprawdzaj strunę po strunie).  
3. Stopniowo dodawaj kolejne akordy (D, Em, Am) i pracuj nad płynnością zmian.
    `,
    example_1: "/resources/images/brc_L1_cw1.png",
    example_1_description: "Schemat podstawowych akordów otwartych (C, G, D, Em).",
    summary: "Opanowanie podstawowych akordów to klucz do gry większości piosenek. Ćwicz je w wolnym tempie, dbając o czyste wybrzmienie każdej struny.",
    order_number: 1
}, beginnerRhythmCourse);

const lesson2_brc = await lessonsController.createLesson({
    title: "Podstawowe schematy rytmiczne",
    intro: "Poznaj najważniejsze schematy rytmiczne, które pomogą w grze akordowej.",
    content: `
Krok 1: Metrum i podstawowe uderzenia
1. Najczęstsze metrum w muzyce rozrywkowej to 4/4 - cztery uderzenia na takt.  
2. Przy metrum 3/4 masz trzy uderzenia na takt (walcowy charakter).  
3. W stylach country czy bluegrass często spotkasz 2/4.

Krok 2: Opanuj podstawowe uderzenia (downstroke i upstroke)  
1. Downstroke (D) - uderzenie kostką w dół.  
2. Upstroke (U) - uderzenie kostką w górę.  
3. Połącz je w różne schematy, np. D - D U - U D U.

Krok 3: Ćwiczenie z metronomem  
1. Ustaw metronom na 60 BPM i ćwicz równe uderzenia w dół.  
2. Dodaj upstroke, tworząc podstawowy rytm.  
3. Powoli przyspiesz tempo (np. co 5 BPM), zachowując stabilność rytmu.
    `,
    example_1: "/resources/images/brc_L2_cw1.png",
    example_1_description: "Podstawowe schematy rytmiczne (D - U - D - U) w metrum 4/4 oraz przykłady w metrum 3/4 i 2/4.",
    
    summary: "Znajomość i opanowanie różnych schematów rytmicznych to fundament gry akordowej. Ćwicz z metronomem i stopniowo zwiększaj tempo.",
    order_number: 2
}, beginnerRhythmCourse);

const lesson3_brc = await lessonsController.createLesson({
    title: "Zmiany akordów w rytmie",
    intro: "Ćwicz płynne zmiany akordów, aby poprawić swój akompaniament.",
    content: `
Krok 1: Ćwicz wolno, ale precyzyjnie  
1. Zacznij od dwóch akordów (np. C i G).  
2. Ustaw metronom na 60 BPM i zmieniaj akord dokładnie na pierwsze uderzenie w nowym takcie.  
3. Jeśli jakiś dźwięk nie brzmi, skoryguj ułożenie palców.

Krok 2: Stopniowo dodawaj kolejne akordy  
1. Dodaj D i Am do ćwiczenia, tworząc sekwencję C - G - D - Am.  
2. Pozostań przy wolnym tempie, aż nabierzesz płynności zmianach akordów.  
3. Staraj się, by każda zmiana była wykonana w rytmie (na „raz”).

Krok 3: Zastosuj prosty schemat rytmiczny  
1. Wykorzystaj poznany rytm przy każdej zmianie akordu.  
2. Licz na głos (1, 2, 3, 4) i zmieniaj akord na „1” każdego kolejnego taktu.  
3. Gdy będziesz czuć się pewnie, zwiększ tempo o kolejne 5 BPM.
    `,
    example_1: "/resources/images/brc_L3_cw1.png",
    example_1_description: "Ilustracja przykładowej sekwencji akordów (C - G - D - Am) z zaznaczonym momentem zmiany na początku taktu.",
    summary: "Płynne zmiany akordów są kluczowe dla brzmienia piosenek. Ćwicz wolno, koncentrując się na czystości dźwięków i stabilnym rytmie.",
    order_number: 3
}, beginnerRhythmCourse);

const lesson4_brc = await lessonsController.createLesson({
    title: "Ćwiczenie rytmu z metronomem",
    intro: "Dowiedz się, jak używać metronomu, aby poprawić precyzję rytmu.",
    content: `
Krok 1: Oswój się z metronomem  
1. Ustaw metronom na 60 BPM i słuchaj kilku taktów, zanim zaczniesz grać.  
2. Zacznij od prostych ćwierćnut - 4 uderzenia kostką w dół na takt w metrum 4/4.  
3. Upewnij się, że uderzasz w struny dokładnie z dźwiękiem metronomu.

Krok 2: Dodaj podstawowy schemat rytmiczny  
1. Wypróbuj wzór D - U - D- U 4 uderzeia na takt.  
2. Zwracaj uwagę, by każde uderzenie było w równych odstępach czasowych.  
3. Gdy poczujesz się pewnie, zwiększ tempo do 70 BPM lub 80 BPM.

Krok 3: Ćwiczenie z akordami  
1. Połącz pracę z metronomem z nauką akordów (C, G, D, Am).  
2. Graj każdy akord przez jeden lub dwa takty, zmieniając go na początku nowego taktu.  
3. Staraj się utrzymać równy rytm przy zmianach akordów.
    `,
    example_1: "/resources/images/brc_L4_cw1.png",
    example_1_description: "Schemat ćwiczenia gry z metronomem przy 60 BPM z prostym uderzeniem w dół: D - D - D - D.",
    
    summary: "Ćwiczenie z metronomem poprawia wyczucie rytmu i uczy precyzji. Zacznij wolno i stopniowo przyspieszaj, trzymając się równego uderzenia.",
    order_number: 4
}, beginnerRhythmCourse);

const lesson5_brc = await lessonsController.createLesson({
    title: "Budowanie akompaniamentu",
    intro: "Poznaj sposoby na łączenie akordów i rytmów w pełne piosenki.",
    content: `
Krok 1: Wybierz zestaw akordów  
1. Popularna progresja to C - G - Am - F (tzw. układ I-V-vi-IV w tonacji C-dur).  
2. Upewnij się, że potrafisz płynnie zmieniać te akordy w wolnym tempie.  
3. Sprawdź, czy każdy z akordów brzmi czysto, bez niechcianych przytłumień.

Krok 2: Dobierz schemat rytmiczny 
1. Wybierz rytm, z którym czujesz się komfortowo.  
2. Zacznij grać go w tempie 60-70 BPM.  
3. Zmieniaj akord na „1” kolejnego taktu i kontroluj, czy każda zmiana jest płynna.

Krok 3: Rozwiń aranżację  
1. Możesz modyfikować schemat rytmiczny, dodając np. dodatkowe uderzenia w górę lub pauzy.  
2. Spróbuj zagrać refren lub zwrotkę ulubionej piosenki, wykorzystując poznane akordy i rytmy.  
3. Nagrywaj siebie i sprawdzaj, czy rytm jest równmo zagrany, a zmiany akordów są bez opóźnień.
    `,
    example_1: "/resources/images/brc_L5_cw1.png",
    example_1_description: "Schemat przedstawiający przykładową progresję akordów (C, G, Am, F) oraz proponowany rytm.",
    summary: "Akompaniament łączy akordy i rytm w całość. Ćwicz płynne zmiany i stabilny rytm, aby móc zagrać większość popularnych piosenek.",
    order_number: 5
}, beginnerRhythmCourse);

// Tworzenie kursu 2
const theoryCourse = await coursesController.createCourse({
    title: "Teoria Muzyki dla Gitarzystów",
    description: "Zrozum podstawy teorii muzyki w grze na gitarze.",
    difficulty: "Średniozaawansowany",
}, teacherDb.id);

// Lekcje dla kursu 2
const lesson1_tc = await lessonsController.createLesson({
    title: "Podstawy zapisu nutowego i tabulatury",
    intro: "Poznaj różnice między zapisem nutowym a tabulaturą oraz naucz się je czytać.",
    content: `
Krok 1: Zrozum zapis nutowy  
1. Pięciolinia wskazuje wysokość dźwięku - im wyżej nuta, tym wyższy dźwięk.  
2. Kształt i wypełnienie nuty (cała, pół, ćwierć, ósemka) mówią o czasie jej trwania.  
3. Na gitarze ten sam dźwięk może występować na różnych progach i strunach - zapisu nutowego trzeba się „nauczyć” pod kątem instrumentu.

Krok 2: Poznaj tabulaturę (TAB)  
1. Tabulatura składa się z sześciu (lub więcej zależnie od gitary) poziomych linii, odpowiadających sześciu strunom gitary.  
2. Liczby na liniach oznaczają, który próg należy nacisnąć (0 - struna pusta, 1 - próg pierwszy, itd.).  
3. Tabulatura jest prostsza dla początkujących, ale nie przekazuje jednoznacznie rytmu - trzeba znać orientacyjnie, jak fraza powinna brzmieć.

Krok 3: Porównaj oba rodzaje zapisu  
1. Weź krótki fragment melodii zapisany w nutach i spróbuj znaleźć odpowiedniki na tabulaturze.  
2. Zwróć uwagę, że nuty precyzyjnie pokazują czas trwania, a tabulatura dokładne miejsce na gryfie.  
3. Ćwicz powoli czytanie nut i tabulatury - z czasem zaczniesz je intuicyjnie łączyć.
    `,
    example_1: "/resources/images/tc_L1_cw1.png",
    example_1_description: "Zapis nutowy dla fragmentu melodii.",
    example_2: "/resources/images/tc_L1_cw2.png",
    example_2_description: "Zapis tabulaturowy dla tego samego fragmentu melodii.",
    summary: "Znajomość zapisu nutowego i tabulatury ułatwia naukę nowych utworów i zrozumienie muzyki. Zacznij od prostych przykładów i stopniowo poszerzaj wiedzę.",
    order_number: 1
}, theoryCourse);

const lesson2_tc = await lessonsController.createLesson({
    title: "Budowa gam i skal muzycznych",
    intro: "Dowiedz się, czym są gamy i skale oraz jak je wykorzystać w grze na gitarze.",
    content: `
Krok 1: Poznaj pojęcie gamy i skali
1. Gama to uporządkowany zbiór dźwięków (najczęściej 7), tworzący konkretną tonację (np. C-dur).  
2. Skala to wzorzec interwałów między kolejnymi dźwiękami (np. pentatoniczna, modalna).  
3. Rozumienie budowy gam i skal pozwala świadomie tworzyć melodie i improwizacje.

Krok 2: Różne rodzaje skal  
1. Gama durowa (major scale) - ma wesołe brzmienie, np. C-dur (C, D, E, F, G, A, B).  
2. Gama molowa (minor scale) - bardziej melancholijna, np. A-moll (A, B, C, D, E, F, G).  
3. Skala pentatoniczna - pięciodźwiękowa i bardzo popularna w rocku i bluesie.  
4. Skale modalne (dorycka, frygijska, lidyjska, itp.) - różne warianty gam diatonicznych.

Krok 3: Ćwiczenie na gryfie  
1. Zagraj gamę C-dur na jednej strunie, by zrozumieć odległości (ton, ton, półton…).  
2. Następnie przećwicz skalę na całym gryfie, zwracając uwagę na równy rytm i czystość dźwięków.  
3. Staraj się ćwiczyć z metronomem, zaczynając od wolnych temp (np. 60 BPM).
    `,
    example_1: "/resources/images/Skala_C_dur.png",
    example_1_description: "Diagram skali durowej C na gryfie gitary",
    
    summary: "Gamy i skale to fundament gry solowej i harmonii. Regularnie ćwicz ich przebiegi na gryfie, aby rozwijać słuch i technikę.",
    order_number: 2
}, theoryCourse);

const lesson3_tc = await lessonsController.createLesson({
    title: "Jak działają interwały?",
    intro: "Zrozum, czym są interwały i jak wpływają na brzmienie muzyki.",
    content: `
Krok 1: Definicja interwału  
1. Interwał to odległość między dwoma dźwiękami mierzona w półtonach lub stopniach gamy.  
2. Na gryfie gitary różne kształty interwałów powtarzają się na całej długości.  
3. Używając tych samych kształtów, możesz łatwo transponować melodie i akordy w inne tonacje.

Krok 2: Najważniejsze interwały w praktyce  
1. Sekunda - odległość 1 tonu (lub półtonu, jeśli to sekunda mała). Typowo jeden próg różnicy.  
2. Tercja - wskazuje charakter akordu (durowy lub molowy).  
3. Kwinta - stabilny interwał, na gitarze często grany jako power chord (palec wskazujący i mały palec).  
4. Oktawa - ten sam dźwięk wyżej lub niżej; na gitarze często różnica dwóch progów i dwóch strun (np. A na strunie E 5. próg, to samo co A na strunie D 7. próg).

Krok 3: Ćwiczenie z interwałami  
1. Spróbuj odnaleźć ten sam dźwięk w różnych oktawach (np. dźwięk G na 3. progu struny E i na 5. progu struny D).  
2. Zagraj power chord (tonika + kwinta) i porównaj go z pełnym akordem durowym (tonika + tercja + kwinta).  
3. Wsłuchaj się w różnicę brzmieniową i zapamiętaj charakter każdego interwału.
    `,
    example_1: "/resources/images/Gryf_dzwieki.png",
    example_1_description: "Interwały na gryfie gitary wraz z nazwami dźwięków.",
    summary: "Interwały pomagają w budowaniu akordów i fraz melodycznych. Poznanie ich na gryfie ułatwia zrozumienie harmonii i kompozycji.",
    order_number: 3
}, theoryCourse);

const lesson4_tc = await lessonsController.createLesson({
    title: "Tworzenie progresji akordowych",
    intro: "Naucz się łączyć akordy w harmonijne sekwencje.",
    content: `
Krok 1: Rozumienie funkcji akordów w tonacji  
1. W tonacji durowej mamy funkcje: I (tonika), IV (subdominanta), V (dominanta) - np. C, F, G w C-dur.  
2. W tonacji molowej mamy inną relację akordów, ale zasada doboru akordów do toniki pozostaje podobna.  
3. Poznanie tych funkcji akordowych pomaga tworzyć poprawne progresje.

Krok 2: Popularne progresje  
1. I - IV - V - I (np. C - F - G - C) - bardzo często spotykana w muzyce pop/rock.  
2. I - V - vi - IV (np. C - G - Am - F) - jedna z najpopularniejszych progresji we współczesnej muzyce.  
3. ii - V - I (np. Dm - G - C) - baza wielu standardów jazzowych.

Krok 3: Ćwiczenie z różnymi rytmami  
1. Zagraj progresję I - IV - V w wybranej tonacji (np. G - C - D).  
2. Następnie wypróbuj wolniejszy rytm lub inną kolejność uderzeń, by odkryć nowe brzmienie.  
3. Zapisz progresję akordów, które Ci się podobają i eksperymentuj, zmieniając tempo czy dodając pauzy.
    `,
    example_1: "/resources/images/tc_L4_cw1.png",
    example_1_description: "Przykład progresji ii - V - I w tonacji C-dur: Dm - G - C.",
    
    summary: "Progresje akordowe to podstawa harmonii. Eksperymentuj z różnymi funkcjami i rytmami, aby odkrywać nowe brzmienia.",
    order_number: 4
}, theoryCourse);

const lesson5_tc = await lessonsController.createLesson({
    title: "Koło kwintowe i tonacje",
    intro: "Poznaj koło kwintowe i jego zastosowanie w muzyce.",
    content: `
Krok 1: Zrozum ideę koła kwintowego 
1. Koło kwintowe przedstawia tonacje durowe (zewnętrzny pierścień) i odpowiadające im tonacje molowe (wewnętrzny pierścień).  
2. Każda kolejna tonacja oddalona jest o jedną kwintę w górę lub w dół - stąd nazwa.  
3. Dzięki takiemu układowi łatwo zobaczyć, które tonacje mają podobną liczbę krzyżyków lub bemoli (znaki przykluczowe).

Krok 2: Jak używać koła kwintowego do doboru akordów  
1. Tonacje sąsiadujące w kole mają wspólne akordy, więc często ładnie ze sobą współgrają.  
2. Sprawdź, jakie akordy pasują do wybranej tonacji, np. G-dur sąsiaduje z D-dur i C-dur.  
3. Możesz budować progresje, przemieszczając się „po sąsiedzku” na kole kwintowym.

Krok 3: Ćwiczenie z ulubionym utworem  
1. Znajdź w jakiej tonacji jest twoja ulubiona piosenka i zlokalizuj ją na kole kwintowym.  
2. Poszukaj akordów z sąsiadujących tonacji, by dodać dobrze brzmiące przejścia w aranżacji.  
3. Zapisz nowe progresje i porównaj ich brzmienie z oryginałem.
    `,
    example_1: "/resources/images/tc_L5_cw1.png",
    example_1_description: "Koło kwintowe, pokazujące relacje między tonacjami durowymi i molowymi, wraz z ich znakami przykluczowymi.",
    summary: "Koło kwintowe pomaga w komponowaniu i zrozumieniu relacji między tonacjami. Wykorzystuj je, by tworzyć ciekawe progresje akordowe.",
    order_number: 5
}, theoryCourse);

// Tworzenie kursu 3
const beginnerCourse = await coursesController.createCourse({
    title: "Podstawy Gry na Gitarze",
    description: "Kurs dla początkujących, który obejmuje podstawowe akordy, rytmy i techniki gry.",
    difficulty: "Początkujący",
}, teacherDb.id);

// Lekcje dla kursu 3
const lesson1_bc = await lessonsController.createLesson({
    title: "Budowa i podstawy gry na gitarze",
    intro: "Poznaj budowę gitary oraz podstawowe zasady gry. Dowiedz się, jak trzymać instrument oraz jakie są najczęstsze błędy początkujących.",
    content: `
Krok 1: Poznaj wszystkie części gitary  
Gitara składa się z kilku podstawowych elementów: pudła rezonansowego, gryfu, progów, strun oraz mostka. Każdy z nich pełni ważną funkcję:  
1. Pudło rezonansowe - (głównie w gitarach akustycznych) wzmacnia dźwięk generowany przez struny.  
2. Gryf - to długa, wąska część gitary, na której znajdują się progi - metalowe pręty pomagające w uzyskaniu różnych wysokości dźwięku.  
3. Struny - drgają, wydając dźwięk, gdy uderzamy w nie palcami lub kostką.  
4. Mostek - utrzymuje struny na korpusie i przekazuje ich wibracje do pudła rezonansowego.  

Krok 2: Naucz się prawidłowego trzymania gitary 
1. Usiądź prosto na krześle lub stołku, stopy oprzyj płasko na podłodze.  
2. Jeśli grasz na gitarze klasycznej, połóż gitarę na lewej nodze, a korpus podeprzyj prawym ramieniem.  
3. W przypadku gitar akustycznych i elektrycznych często stosuje się oparcie instrumentu na prawej nodze (ale z czasem sam zdecydujesz, co jest dla Ciebie najwygodniejsze).  
4. Pilnuj, by plecy pozostały proste, a barki i ręce były rozluźnione.  
5. Lewa ręka powinna swobodnie obejmować gryf, kciuk zaś spoczywać mniej więcej na środku gryfu z tyłu (nie wystawać za krawędź).  

Krok 3: Unikaj najczęstszych błędów
- Zbytnie pochylanie się nad gitarą (co może powodować bóle kręgosłupa).  
- Zbyt mocne dociskanie strun (co męczy dłoń i palce).  
- Trzymanie kciuka zbyt wysoko nad gryfem.  

Ćwicz przed lustrem lub przy użyciu kamerki w telefonie, aby korygować swoją postawę już od pierwszych dni nauki. 
    `,
    example_1: "/resources/images/Gitara_budowa.png",
    example_1_description: "Grafika pokazująca podstawowe elementy gitary elektrycznej.",
    example_2: "/resources/images/Gryf_dzwieki.png",
    example_2_description: "Powyżej przedstawione są dźwięki na gryfie gitary oraz ich nazwy. Zapamiętaj je bo będą Ci potrzebne w dalszej nauce.",
    summary: "Zrozumienie budowy gitary i poprawnego sposobu jej trzymania to pierwszy krok do efektywnej nauki gry. Pamiętaj o utrzymaniu prawidłowej postawy już od samego początku.",
    order_number: 1
}, beginnerCourse);

const lesson2_bc = await lessonsController.createLesson({
    title: "Podstawowe akordy gitarowe",
    intro: "Naucz się podstawowych akordów i ich poprawnego chwytania.",
    content: `
Krok 1: Czym są akordy?  
Akord to grupa dźwięków granych jednocześnie. W muzyce popularnej na gitarze często używa się akordów otwartych: G-dur, C-dur, D-dur, E-moll, A-moll.  

Krok 2: Jak poprawnie chwytać akordy?
1. Każdy palec naciska tylko jedną strunę i to możliwie blisko progu.  
2. Unikaj dotykania przypadkowych strun palcem, który nie jest do nich przeznaczony.  
3. Kciuk umieść z tyłu gryfu, mniej więcej na jego środku - zapewni to stabilność ręki.  
4. Początkowo zmiany akordów mogą być trudne - ćwicz je powoli, starając się wyrobić pamięć mięśniową.  

Krok 3: Pierwsze akordy do nauki  
- G-dur - często spotykany w rocku i popie.  
- C-dur - kluczowy akord w wielu piosenkach.  
- D-dur - używany w utworach folkowych i popowych.  
- E-moll - jeden z najłatwiejszych akordów dla początkujących.  

Krok 4: Ćwicz, aby wyrobić płynność
Spróbuj płynnie przechodzić między G-dur, C-dur, a D-dur, grając każdy akord uderzeniem w dół. Następnie dodaj E-moll - ćwicz przejścia w wolnym tempie.
Skorzystaj z biblioteki akordów i wypróbuj inne popularne chwyty.

    `,
    example_1: "/resources/images/bc_L2_cw1.png",
    example_1_description: "Schemat chywtania akordów G, C i D w formie graficznej.",
    
    example_2: "/resources/images/bc_L2_cw2.png",
    example_2_description: "Schemat E-Dur, A-moll oraz E-Moll.",
    
    summary: "Znajomość podstawowych akordów otwartych to klucz do grania wielu popularnych utworów. Pamiętaj, aby ćwiczyć wolno i dokładnie, stopniowo przyspieszając tempo.",
    order_number: 2
}, beginnerCourse);


const lesson3_bc = await lessonsController.createLesson({
    title: "Technika kostkowania i uderzania strun",
    intro: "Dowiedz się, jak poprawnie uderzać struny oraz jakie techniki kostkowania są najważniejsze.",
    content: `
Krok 1: Rodzaje kostkowania
1. Kostkowanie w dół (downstroke) każde uderzenie idzie w dół.  
2. Kostkowanie naprzemienne (alternate picking) - uderzenia w dół i w górę na przemian, co pozwala na szybszą i płynniejszą grę.  

Krok 2: Prawidłowy uchwyt kostki  
1. Zegnij lekko kciuk i palec wskazujący, a kostkę umieść pomiędzy nimi.  
2. Pilnuj, aby kostka wystawała nieco poza palce - nie zaciskaj jej zbyt głęboko.  
3. Nadgarstek utrzymuj luźny i elastyczny; to on wykonuje większość ruchu.  

Krok 3: Ćwiczenie kontroli kostkowania
1. Zacznij od pustych strun - powoli uderzaj w struny od najgrubszej do najcieńszej, wszystkie w dół.  
2. Gdy poczujesz się pewniej, spróbuj stosować kostkowanie naprzemienne.  
3. Staraj się uzyskać tą samą artykulację dźwięku na każdej ze strun.  

Krok 4: Stopniowe zwiększanie tempa
Włącz metronom, zacznij od 60 BPM i co kilka minut zwiększaj tempo o 5 BPM. Obserwuj, czy ruchy dłoni pozostają płynne i czy nie pojawia się napięcie w nadgarstku.
    `,
    example_1: "/resources/images/bc_L3_cw1.png",
    example_1_description: "Podstawowy wzór rytmiczny (w dół, w górę) do ćwiczeń kostkowania.",
    summary: "Poprawna technika kostkowania umożliwia precyzyjną i dynamiczną grę. Ćwicz regularnie z metronomem, aby utrzymać równomierne tempo.",
    order_number: 3
}, beginnerCourse);

const lesson4_bc = await lessonsController.createLesson({
    title: "Podstawowe rytmy i metrum",
    intro: "Naucz się podstaw rytmiki i jej zastosowania w grze na gitarze.",
    content: `
Krok 1: Co to jest metrum? 
Metrum wyznacza, jak liczone są miary w takcie. Najpopularniejsze metrum w muzyce rozrywkowej to:  
- 4/4 - cztery uderzenia na takt.  
- 3/4 - trzy uderzenia na takt.

Krok 2: Ćwiczenie z metronomem  
1. Ustaw metronom na 60 BPM.  
2. Wybierz dowolny akord, np. C-dur. Uderzaj w struny w każdą miarę metrum 4/4 (raz, dwa, trzy, cztery...).  
3. Następnie przejdź do metrum 3/4 (raz, dwa, trzy...).  
4. Zwróć uwagę, by każde uderzenie było równe w czasie i miało podobną głośność.

Krok 3: Rozpoznawanie rytmów w piosenkach  
Gdy słuchasz utworów, staraj się policzyć uderzenia na takt i zidentyfikować metrum. To prosty sposób na rozwijanie poczucia rytmu. 
    `,
    example_1: "/resources/images/bc_L4_cw1.png",
    example_1_description: "Ilustracja przedstawiająca, jak wygląda zapis metrum 4/4, przy użyciu akordu C-Dur.",
    
    example_2: "/resources/images/bc_L4_cw2.png",
    example_2_description: "Przykładowe ćwiczenie rytmiczne dla metrum 3/4 przy użyuciu akordu C-Dur.",
    
    summary: "Rytm to podstawa każdej piosenki. Regularne ćwiczenie z metronomem i rozpoznawanie metrum w utworach pomoże ci rozwinąć stabilne poczucie rytmu.",
    order_number: 4
}, beginnerCourse);

const lesson5_bc = await lessonsController.createLesson({
    title: "Gra pierwszych prostych melodii",
    intro: "Zagraj swoje pierwsze proste melodie i ćwicz dokładność uderzeń.",
    content: `
Krok 1: Przygotuj się do gry  
1. Upewnij się, że gitara jest nastrojona.  
2. Zlokalizuj na gryfie progi, które będą ci potrzebne, korzystając z tabulatur (zapisu w postaci numerów progów na konkretnych strunach).  

Krok 2: Opanuj technikę grania pojedynczych dźwięków 
- Uderzaj w jedną strunę, palec lewej ręki ustaw na odpowiednim progu.  
- Naciskaj strunę tuż przy progu, aby uzyskać czysty dźwięk.  
- Staraj się nie dociskać zbyt mocno, aby nie męczyć palców.  

Krok 3: Przykładowe melodie dla początkujących  
- "Mary Had a Little Lamb" - proste przejścia na dwóch lub trzech strunach.  
- "Twinkle Twinkle Little Star" - również kilka progów na jednej lub dwóch strunach.  
- Ćwicz powoli, zwracając uwagę na czystość każdego dźwięku.  
- Stopniowo przyspieszaj tempo i pamiętaj o równomiernych uderzeniach kostką (naprzemiennie w dół i w górę).  
    `,
    example_1: "/resources/images/bc_L5_cw1.png",
    example_1_description: "Tabulatura pokazująca prostą melodię.",
    summary: "Opanowanie prostych melodii to ważny krok w nauce gry na gitarze. Ćwicz wolno i dokładnie, aby wyrabiać odpowiednie nawyki na przyszłość.",
    order_number: 5
}, beginnerCourse);

// Tworzenie kursu 4
const intermediateCourse = await coursesController.createCourse({
    title: "Improwizacja i Granie Solówek",
    description: "Rozwiń swoje umiejętności w graniu solówek i improwizacji, poznając techniki legato i slide.",
    difficulty: "Średniozaawansowany",
}, teacherDb2.id);

// Lekcje dla kursu 4
const lesson1_ic = await lessonsController.createLesson({
    title: "Poprawna rozgrzewka przed grą na gitarze",
    intro: "Dowiedz się, jak prawidłowo przygotować dłonie i palce do gry na gitarze, aby uniknąć kontuzji i poprawić precyzję ruchów.",
    content: `
Krok 1: Ćwiczenia rozciągające  
1. Delikatnie rozciągnij palce - wyprostuj dłoń i drugą ręką delikatnie odchylaj każdy palec do tyłu przez 2-3 sekundy.  
2. Powoli otwieraj i zamykaj dłoń kilka razy, aby rozgrzać stawy.  
3. Rozciągnij nadgarstki, obracając je w obie strony (po kilkanaście sekund).

Krok 2: Pobudzenie krążenia krwi  
1. Lekkie potrząsanie dłońmi (jakbyś strząsał resztki wody po umyciu rąk).  
2. Pocieraj energicznie dłonie o siebie przez kilka sekund.  
3. Możesz też wykonać kilka szybkich zacisków i rozluźnień pięści.

Krok 3: Proste ćwiczenia na gryfie  
1. Umieść palce lewej ręki kolejno na progach na każdej strunie (spójrz na przykład poniżej), grając po jednym dźwięku na strunę.  
2. Nie przejmuj się szybkością - celem jest rozruszanie palców.  
3. Staraj się, by każdy dźwięk był czysty i w miarę możliwości równy w głośności.
    `,
    example_1: "/resources/images/ic_L1_cw1.png",
    example_1_description: "Ilustracja pokazująca ćwiczenia rozgrzewające dłonie przed grą.",
    summary: "Regularna rozgrzewka to fundament skutecznej gry. Zapobiega kontuzjom i poprawia precyzję ruchów. Pamiętaj, by zawsze poświęcić kilka minut na rozgrzewkę przed każdą sesją gry.",
    order_number: 1
}, intermediateCourse);


const lesson2_ic = await lessonsController.createLesson({
    title: "Synchronizacja rąk - precyzyjne uderzanie strun",
    intro: "Dowiedz się, jak skoordynować ruchy lewej i prawej ręki, aby grać dokładnie i płynnie.",
    content: `
Krok 1: Wolne tempo i kontrola  
1. Zacznij od pustych strun. Kostkuj w wolnym tempie (np. 60 BPM), uderzając naprzemiennie (w dół i w górę).  
2. Obserwuj, czy każda struna wybrzmiewa wyraźnie, nie powinna być tłumiona przez palce lewej ręki, jeśli jej używasz.

Krok 2: Dodanie lewej ręki 
1. Ćwicz sekwencję 1-2-3-4 (patrz przykład poniżej) na każdej strunie - za każdym razem kostkuj równomiernie.  
2. Pamiętaj, by lewą ręką dociskać progi tylko na tyle mocno, by uzyskać czysty dźwięk.  
3. Zwracaj uwagę na to, aby palce nie blokowały sąsiednich strun.

Krok 3: Stopniowe zwiększanie tempa  
1. Ustaw metronom na 60 BPM, a po kilku powtórzeniach zwiększ tempo o 5 BPM.  
2. Obserwuj, czy ruchy obu rąk pozostają skoordynowane - każda nuta powinna być uderzona we właściwym momencie, bez opóźnień i przy zachowaniu czystości dźwięku.
    `,
    example_1: "/resources/images/ic_L2_cw1.png",
    example_1_description: "Ćwiczenie synchronizacji palców lewej ręki z ruchem prawej ręki kostkującej.",
    
    example_2: "/resources/images/ic_L2_cw2.png",
    example_2_description: "Ćwiczenie synchonizaji na wyższych pozycjach gryfu.",
    
    summary: "Ćwiczenia synchronizacji rąk pozwalają na płynniejszą i dokładniejszą grę. Zaczynaj od wolnego tempa i stopniowo je zwiększaj, utrzymując równe uderzenia i czyste dźwięki.",
    order_number: 2
}, intermediateCourse);


const lesson3_ic = await lessonsController.createLesson({
    title: "Budowanie szybkości i precyzji gry",
    intro: "Dowiedz się, jak efektywnie ćwiczyć, aby poprawić szybkość i dokładność gry na gitarze.",
    content: `
Krok 1: Skup się na czystości gry  
1. Zawsze najpierw ćwicz wolno - precyzja jest ważniejsza niż szybkość.  
2. Upewnij się, że każda nuta wybrzmiewa wyraźnie i nie jest tłumiona przez inne palce.

Krok 2: Ekonomia ruchów  
1. Nie odrywaj palców wyżej niż to konieczne, gdy zmieniasz progi.  
2. Staraj się, aby kostkowanie było płynne i wykonywane nadgarstkiem, bez zbędnych ruchów całego ramienia.

Krok 3: Ćwiczenia skalowe z metronomem 
1. Wybierz skalę (np. pentatoniczną lub durową). Zagraj ją w tempie 60 BPM, po jednej nucie na każde kliknięcie.  
2. Po kilku powtórzeniach zwiększ tempo o 5 BPM i sprawdź, czy wciąż grasz bez błędów.  
3. Kontynuuj ten proces, aż znajdziesz swoją górną granicę tempa, przy której utrzymujesz dokładność.
    `,
    example_1: "/resources/images/ic_L3_cw1.png",
    example_1_description: "Ćwiczenie gamy z podziałem na uderzenia w równych odstępach czasowych.",
    summary: "Budowanie szybkości wymaga cierpliwości i regularnych ćwiczeń z metronomem. Priorytetem jest czystość dźwięków i kontrola nad ruchami palców.",
    order_number: 3
}, intermediateCourse);


const lesson4_ic = await lessonsController.createLesson({
    title: "Granie fragmentów skal i sekwencji",
    intro: "Naucz się grać fragmenty skal i łączyć je w płynne sekwencje.",
    content: `
Krok 1: Zrozum strukturę skali  
1. Wybierz skalę.  
2. Zapoznaj się z jej rozmieszczeniem na gryfie - które progi na których strunach wchodzą w jej skład.  
3. Upewnij się, że wiesz, jak wygląda kolejność dźwięków (np. 1, b3, 4, 5, b7 w pentatonice mollowej).

Krok 2: Ćwiczenie małych fragmentów  
1. Wybierz kilka dźwięków z danej skali i powtarzaj je w kółko, dbając o czystość i rytm.  
2. Zmieniaj kolejność tych dźwięków, tworząc małe motywy muzyczne.  
3. Spróbuj wprowadzać naprzemienne kostkowanie i różne rytmy (np. ósemki).

Krok 3: Łączenie pozycji skalowych  
1. Wybierz dwie sąsiadujące ze sobą pozycje skali (np. na 5. i 7. progu) i spróbuj płynnie przechodzić między nimi.  
2. Staraj się, aby przejścia między pozycjami były równie wyraźne i bez nagłego zrywania dźwięku.  
3. Zwracaj uwagę na precyzyjne ustawienie palców lewej ręki.
    `,
    example_1: "/resources/images/ic_L4_cw1.png",
    example_1_description: "Diagram pokazujący układ skali pentatonicznej G-Dur w dwóch pozycjach na gryfie.",
    
    example_2: "/resources/images/ic_L4_cw2.png",
    example_2_description: "Przykładowe sekwencje nut w obrębie skali, które można ćwiczyć w różnych pozycjach.",
    
    summary: "Ćwiczenie fragmentów skal i łączenie pozycji rozwija płynność gry oraz otwiera drogę do kreatywnych solówek. Kluczem jest powolne opanowanie małych motywów i stopniowe dodawanie kolejnych fragmentów.",
    order_number: 4
}, intermediateCourse);


const lesson5_ic = await lessonsController.createLesson({
    title: "Płynność i artykulacja dźwięków w solówkach",
    intro: "Dowiedz się, jak poprawnie grać solówki z płynnością i wyrazistością.",
    content: `
Krok 1: Poznaj podstawowe techniki artykulacyjne  
1. Hammer-on i pull-off - służą do płynniejszego łączenia dźwięków bez konieczności kostkowania każdego z nich.  
2. Slide - przesunięcie palca z jednego progu na drugi, nadające charakterystyczny „ślizg” między dźwiękami.  
3. Vibrato - delikatne podciąganie i opuszczanie struny palcem na progu, by dodać ekspresji dźwiękowi.

Krok 2: Ćwiczenie prostych fraz  
1. Wybierz 3-4 dźwięki z ulubionej skali (np. pentatonicznej).  
2. Używaj hammer-ons i pull-offs, aby połączyć je w płynną frazę.  
3. Dodaj lekkie vibrato na dźwiękach dla wyrazistego frazowania.

Krok 3: Frazowanie i dynamika  
1. Myśl o fragmentach muzycznych - nie graj ciągle na maksymalnej głośności.  
2. Zmieniaj intensywność kostkowania, by nadać frazom charakter i emocje.  
3. Pamiętaj, że przerwy (pauzy) też są częścią frazowania - dają czas na wybrzmienie poprzednich dźwięków.
    `,
    example_1: "/resources/images/ic_L5_cw1.png",
    example_1_description: "Grafika ilustrująca techniki hammer-on, pull-off i slide na gryfie gitary w pentatonice D.",
    summary: "Płynność gry to klucz do dobrej solówki. Ćwicz artykulację i dynamikę dźwięków, aby wzbogacić swoją muzykalność i wyrazistość gry.",
    order_number: 5
}, intermediateCourse);

// Tworzenie kursu 5
const advancedCourse = await coursesController.createCourse({
    title: "Zaawansowane Techniki Gry na Gitarze",
    description: "Opanuj techniki takie jak sweep picking, tapping i gry w wysokim tempie.",
    difficulty: "Zaawansowany",
}, teacherDb.id);

// Lekcje dla kursu 5
const lesson1_ac = await lessonsController.createLesson({
    title: "Hybrid Picking - mieszane kostkowanie i palcowanie",
    intro: "Technika hybrid picking pozwala na większą swobodę i płynność w grze solówek oraz akompaniamentu.",
    content: `Hybrid picking polega na użyciu kostki oraz palców do gry jednocześnie, co daje większą kontrolę nad dynamiką.

    Podstawowe zasady hybrid pickingu:
    1. Kostką uderzaj niższe struny, a palcami wskazującym i środkowym grę na wyższych strunach.
    2. Używaj tej techniki w szybkich przebiegach i arpeggiach dla większej płynności.
    3. Staraj się, aby każde uderzenie było precyzyjne.

    Ćwiczenie:
    1. Graj sekwencję na strunach D, G, B (widniejące nad progami skrót to: PW - palec wskazujący i PŚ - palec środkowy) używając kostki na basowych strunach i palców na wysokich strunach.
    2. Stopniowo dodawaj bardziej skomplikowane arpeggia, łącząc kostkowanie z palcowaniem.`,
    example_1: "/resources/images/ac_L1_cw1.png",
    example_1_description: "Schemat techniki hybrid picking.",
    summary: "Hybrid picking pozwala na szybsze i bardziej płynne granie. Kluczem jest synchronizacja ruchów.",
    order_number: 1
}, advancedCourse);

const lesson2_ac = await lessonsController.createLesson({
    title: "Sweep Picking - szybkie arpeggia",
    intro: "Naucz się techniki sweep picking, pozwalającej na granie szybkich arpeggiów.",
    content: `Sweep picking to technika umożliwiająca szybkie granie arpeggiów poprzez płynne przesuwanie kostki w górę lub w dół po strunach.

    Kluczowe zasady sweep pickingu:
    1. Kostka powinna poruszać się płynnie, jakby „przesuwała się” po strunach.
    2. Lewa ręka musi precyzyjnie dociskać odpowiednie progi w odpowiednim czasie.
    3. Każdy dźwięk powinien być wyraźny - nie może się na siebie nakładać.
    4. Najlepiej zaczynać od prostych kształtów arpeggiów.

    Ćwiczenie:
    1. Zagraj podstawowe arpeggio na czterech strunach.
    2. Stopniowo dodawaj kolejne struny, rozszerzając zakres techniki.`,
    example_1: "/resources/images/ac_L2_cw1.png",
    example_1_description: "Tabulatura z prostym arpeggiem na czterech strunach",
    example_2: "/resources/images/ac_L2_cw2.png",
    example_2_description: "Tabulatura z prostym arpeggiem na wszystkich strunach.",
    summary: "Sweep picking pozwala na szybkie i płynne granie arpeggiów. Kluczem jest precyzja i kontrola nad dźwiękami.",
    order_number: 2
}, advancedCourse);

const lesson3_ac = await lessonsController.createLesson({
    title: "Tapping - szybkie legato z użyciem obu rąk.",
    intro: "Poznaj technikę tappingu, która pozwala na szybkie zagranie dźwięków przy użyciu prawej i lewej ręki.",
    content: `Tapping to technika używana w solówkach, w której prawa ręka uderza w progi na gryfie, pozwalając na szybkie i płynne granie.

    Podstawowe zasady tappingu:
    1. Wykorzystuj palec wskazujący lub środkowy prawej ręki do uderzania w progi.
    2. Każdy dźwięk powinien być czysty i mieć odpowiednią głośność.
    3. Kombinuj tapping z legato dla płynniejszych przejść.

    Ćwiczenie:
    1. Na strunie G, zagraj schemat 5-9-12 (tapping na 12 progu).
    2. Przesuwaj ten schemat na kolejne struny i zwiększaj tempo stopniowo.`,
    example_1: "/resources/images/ac_L3_cw1.png",
    example_1_description: "Tabulatura przedstawiająca prosty schemat tappingu.",
    summary: "Tapping to technika dająca niesamowitą szybkość i płynność. Ćwicz powoli i stopniowo zwiększaj tempo.",
    order_number: 3
}, advancedCourse);

const lesson4_ac = await lessonsController.createLesson({
    title: "Technika Legato - płynne granie dźwięków",
    intro: "Poznaj technikę legato, czyli sposób grania bez użycia kostki przy zmianach dźwięków.",
    content: `Legato to technika, w której następuje płynne przejście przez dźwięki przy minimalnym użyciu kostki. Wykorzystuje głównie połączenie technik hammer-on i pull-off.

    Zasady gry legato:
    1. Używaj hammer-on, czyli uderzania palcem w próg bez kostkowania.
    2. Wykorzystuj pull-off, czyli pociąganie palca w dół po strunie, aby uzyskać kolejny dźwięk.
    3. Minimalizuj użycie kostki - kostkowanie odbywa się tylko na pierwszej nucie frazy.
    4. Graj w równym tempie, zaczynając od 60 BPM i stopniowo zwiększając.

    Ćwiczenie:
    1. Na jednej strunie zagraj schemat używając tylko legato.
    2. Powtórz na każdej strunie, starając się utrzymać równomierny rytm.`,
    example_1: "/resources/images/ac_L4_cw1.png",
    example_1_description: "Tabulatura przedstawiająca ćwiczenie legato na jednej strunie.",
    example_2: "/resources/images/ac_L4_cw2.png",
    example_2_description: "Tabulatura przedstawiająca ćwiczenie legato na kilku strunach.",
    summary: "Legato pozwala na płynniejsze solówki i zwiększa ekspresję gry. Ćwicz wolno i dokładnie.",
    order_number: 4
}, advancedCourse);

const lesson5_ac = await lessonsController.createLesson({
    title: "String Skipping - przeskakiwanie strun",
    intro: "String skipping to technika polegająca na omijaniu sąsiednich strun w celu uzyskania dynamiczniejszych przebiegów.",
    content: `Przeskakiwanie strun dodaje nową jakość do solówek i ułatwia tworzenie bardziej rozbudowanych melodii.

    Zasady string skipping:
    1. Kostkuj czysto i precyzyjnie - unikanie przypadkowego uderzania w sąsiednie struny jest kluczowe.
    2. Ćwicz powoli, aby każda nuta była wyraźna.
    3. Wykorzystuj tę technikę w improwizacjach, aby dodać oryginalne brzmienie.

    Ćwiczenie:
    1. Zagraj przykład poniżej z pominięciem jednej struny w każdej sekwencji.
    2. Stopniowo zwiększaj tempo i eksperymentuj z ilością zagranych dźwięków.`,
    example_1: "/resources/images/ac_L5_cw1.png",
    example_1_description: "Tabulatura ilustrująca technikę string skipping.",
    summary: "String skipping pozwala na dynamiczniejsze i ciekawsze frazy. Ćwicz precyzyjnie, aby uniknąć przypadkowych dźwięków.",
    order_number: 5
}, advancedCourse);

export {
    usersController,
    coursesController,
    lessonsController,
    progressController,
    libraryController,
    bookmarksController,
    enrollmentController,
    quizzesController,
    feedbackController
};
