import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CursorArrowRaysIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setAnswer, setCurrent } from '../feature/vocabSlice';
import vocabApi from '../api/vocabApi';
import { audioPlay } from '../helpers/audioHelper';
import { useNavigate } from 'react-router-dom';

interface VocabularyInputProps {
  vocab: string;
  current: number;
  isSystem: boolean;
}

const VocabularyInput: React.FC<VocabularyInputProps> = ({ vocab, current, isSystem }) => {
  const [input, setInput] = useState('');
  const {t} = useTranslation();
  const debounceRef = useRef<number | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const uniqueShuffledChars = useMemo(() =>{
   return Array.from(new Set(vocab?.split('')))
   .sort(() => Math.random() - 0.5);
  },[vocab]);

  const vocabCompare = async () => {
    if(vocab.toLowerCase() === input.toLowerCase()){
      if(!isSystem){
        dispatch(setAnswer(input));
      }
      if(!input.includes(' ')){
        try {
          const res = await vocabApi.getVocab(input);
          if(res.audio != "" && res.audio != undefined){
            await audioPlay(res.audio);
          }
        } catch (error) {
          console.error("can't read the audio: ", error);
        }
      }
      dispatch(setCurrent(current + 1));
      if(isSystem){
        
        navigate('/system-vocab/learn');
      }
      setInput('');
    }
  }

  useEffect(() =>{
    if (debounceRef.current !== null) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(() => {
      vocabCompare();
    }, 1000);
  },[input]);

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);   
  };

  const handleSuggest = async () => {
    let nextInput = '';

    for (let i = 0; i < Math.min(input.length, vocab.length); i++) {
      if (input[i] === vocab[i]) {
        nextInput += input[i];
      } else {
        break;
      }
    }

    if (nextInput.length < vocab.length) {
      nextInput += vocab[nextInput.length];
    }

    setInput(nextInput);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="block text-base18 font-medium dark:text-white">{t('language')}</label>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        className="w-full p-2 border border-gray-200 rounded text-black outline-none mb-4"
        placeholder="Type the vocabulary..."
      />
      <div className='flex justify-center items-center gap-2'>
        <div className="flex flex-wrap gap-2">
          {uniqueShuffledChars.map((char, idx) => {

            return (
              <span
              onClick={() => setInput(prev => prev + char)}
                key={idx}
                className="w-10 h-10 text-black flex justify-center items-center rounded-xl font-semibold bg-blue-100 hover:bg-blue-200"
              >
                {char}
              </span>
            );
          })}

        </div>
        <div onClick={input === vocab ? undefined : handleSuggest} className='flex gap-1 bg-blue-100 rounded-xl p-2 hover:bg-blue-200'>
          <CursorArrowRaysIcon className='w-6 h-6'/>
          <span>{t("suggest")}</span>
        </div>
      </div>
    </div>
  );
};

export default VocabularyInput;
