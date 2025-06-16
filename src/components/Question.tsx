import { useNavigate } from "react-router-dom";
import { setAnswer, setCurrent } from "../feature/vocabSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useEffect, useRef } from "react";
import { audioPlay } from "../helpers/audioHelper";
import vocabApi from "../api/vocabApi";
import { useAuth } from "../context/UserContext";
import { useSettings } from "../context/SettingsContext";

interface QuestionProps{
    questions: string[];
    vocab: string;
    isSystem: boolean;
}

const Question = ({questions, vocab, isSystem}: QuestionProps) => {
    const selectedAnswer = useSelector((state: RootState) => state.vocab.selectedAnswer);
    const debounceRef = useRef<number | null>(null);
    const current = useSelector((state: RootState) => state.vocab.current);
    const vocabList = useSelector((state: RootState) => state.vocab.vocabList);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useAuth();
    const {settings} = useSettings();

    useEffect(() => {
        dispatch(setAnswer(null));
    }, [current]);

    const handleChoose = async (question: string) => {
        if (selectedAnswer !== null) return;

        dispatch(setAnswer(question));
        if (debounceRef.current !== null) {
            clearTimeout(debounceRef.current);
        }
        try {
            if (!vocab.includes(' ')) {
                try {
                    const phonetic = await vocabApi.getVocab(vocab);
                    if (phonetic?.audio) {
                        await audioPlay(phonetic.audio);
                    }
                } catch (error) {
                    console.error("can't read the audio: ", error);
                }
            }
            debounceRef.current = window.setTimeout(() => {
                if (question === vocab) {
                    vocabApi.update(user?._id || '', vocabList[current]._id, settings?.remindTime || 3);
                    if (isSystem) {
                        navigate('/system-vocab/learn-input');
                    } else {
                        dispatch(setCurrent(current + 1));
                    }
                } else {
                    if (isSystem) {
                        navigate('/system-vocab/learn');
                    } else {
                        navigate('/my-vocab/remember');
                    }
                }
            }, 1000);

        } catch (error) {
            console.error('Something went wrong:', error);
        }
    };


  return (
    <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4">
        {questions.map((question, index) =>{
            let bgColor = "bg-white hover:bg-blue-50";
            if (selectedAnswer === question) {
            bgColor =
                question === vocab ? "bg-green-400" : "bg-red-400";
            }

            return <div 
                        key={index}
                        className={`px-5 py-3 text-base18 font-medium border border-gray-200 rounded-md ${bgColor}`}
                        onClick={() =>handleChoose(question)}
                    >
                {index + 1}. {question}
            </div>
        })}
    </div>
  )
}

export default Question