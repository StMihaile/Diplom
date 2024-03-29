import { useNavigate } from "react-router-dom";
import { Accordion } from "../../accordion/accordion";


const dataFAQ = [
  {
    title: 'Мультиязычность',
    content:
      'Амбициозная, но вполне решаемая задачка. Главная проблема тут именно в контенте: нужно очень хорошо знать язык, чтобы суметь составить грамотную таблицу первоначальных фраз, из которых будет собираться не режущий глаз рыбатекст. Конечно, тут никак не обойтись без волонтеров, которые засядут за написание (именно написание, а не просто перевод) текста-рыбы на английском, немецком, французском, украинском, белорусском и любых других языках.',
  },
  {
    title: 'Расширение к браузерам',
    content:
      'Амбициозная, но вполне решаемая задачка. Главная проблема тут именно в контенте: нужно очень хорошо знать язык, чтобы суметь составить грамотную таблицу первоначальных фраз, из которых будет собираться не режущий глаз рыбатекст. Конечно, тут никак не обойтись без волонтеров, которые засядут за написание (именно написание, а не просто перевод) текста-рыбы на английском, немецком, французском, украинском, белорусском и любых других языках.',
  },
  {
    title: 'Плеер',
    content:
      'Амбициозная, но вполне решаемая задачка. Главная проблема тут именно в контенте: нужно очень хорошо знать язык, чтобы суметь составить грамотную таблицу первоначальных фраз, из которых будет собираться не режущий глаз рыбатекст. Конечно, тут никак не обойтись без волонтеров, которые засядут за написание (именно написание, а не просто перевод) текста-рыбы на английском, немецком, французском, украинском, белорусском и любых других языках.',
  },
  {
    title: 'Личный кабинет',
    content:
      'Амбициозная, но вполне решаемая задачка. Главная проблема тут именно в контенте: нужно очень хорошо знать язык, чтобы суметь составить грамотную таблицу первоначальных фраз, из которых будет собираться не режущий глаз рыбатекст. Конечно, тут никак не обойтись без волонтеров, которые засядут за написание (именно написание, а не просто перевод) текста-рыбы на английском, немецком, французском, украинском, белорусском и любых других языках.',
  },
  {
    title:
      'Рейтинг',
    content:
      'Амбициозная, но вполне решаемая задачка. Главная проблема тут именно в контенте: нужно очень хорошо знать язык, чтобы суметь составить грамотную таблицу первоначальных фраз, из которых будет собираться не режущий глаз рыбатекст. Конечно, тут никак не обойтись без волонтеров, которые засядут за написание (именно написание, а не просто перевод) текста-рыбы на английском, немецком, французском, украинском, белорусском и любых других языках.',
  },
  {
    title:
      'Сортировка',
    content:
      'Амбициозная, но вполне решаемая задачка. Главная проблема тут именно в контенте: нужно очень хорошо знать язык, чтобы суметь составить грамотную таблицу первоначальных фраз, из которых будет собираться не режущий глаз рыбатекст. Конечно, тут никак не обойтись без волонтеров, которые засядут за написание (именно написание, а не просто перевод) текста-рыбы на английском, немецком, французском, украинском, белорусском и любых других языках.',
  },
  {
    title: 'Регистрация',
    content:
      'Амбициозная, но вполне решаемая задачка. Главная проблема тут именно в контенте: нужно очень хорошо знать язык, чтобы суметь составить грамотную таблицу первоначальных фраз, из которых будет собираться не режущий глаз рыбатекст. Конечно, тут никак не обойтись без волонтеров, которые засядут за написание (именно написание, а не просто перевод) текста-рыбы на английском, немецком, французском, украинском, белорусском и любых других языках.',
  },
  {
    title: 'Восстановление пароля',
    content:
      'Амбициозная, но вполне решаемая задачка. Главная проблема тут именно в контенте: нужно очень хорошо знать язык, чтобы суметь составить грамотную таблицу первоначальных фраз, из которых будет собираться не режущий глаз рыбатекст. Конечно, тут никак не обойтись без волонтеров, которые засядут за написание (именно написание, а не просто перевод) текста-рыбы на английском, немецком, французском, украинском, белорусском и любых других языках.',
  },
  {
    title:
      'Аватарка',
    content:
      'Амбициозная, но вполне решаемая задачка. Главная проблема тут именно в контенте: нужно очень хорошо знать язык, чтобы суметь составить грамотную таблицу первоначальных фраз, из которых будет собираться не режущий глаз рыбатекст. Конечно, тут никак не обойтись без волонтеров, которые засядут за написание (именно написание, а не просто перевод) текста-рыбы на английском, немецком, французском, украинском, белорусском и любых других языках.',
  },
];

export const FaqPage = () => {
  const data = dataFAQ.map((el) => ({ ...el, id: el.title.slice(10) }));
  const navigate = useNavigate();

  return (
    <>

<span className="back" onClick={() => navigate(-1)}>
          {"< Назад"}
        </span>
      <h1>Часто задаваемые вопросы</h1>
      {data.map((e, i) => (
        <Accordion key={e.id || i} title={e.title}>
          {e.content}
        </Accordion>
      ))}
    </>
  );
};