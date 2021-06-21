import React from 'react';
import { IonCard, IonDatetime, IonCardContent} from '@ionic/react';
import IData from '../IData';

//definition of element props
type CardDateProps = {
  meeting: IData,
  onChoose(date: string): void,
  dateActive: string
}

//render functional component
const CardDate: React.FC<CardDateProps> = ({meeting, onChoose, dateActive}) => {

  let classesIonCard: Array<string> = ['card__datetime'];

  dateActive === meeting.date ? classesIonCard.push('active') : classesIonCard.push('');

  return (
        <IonCard className={classesIonCard.join(' ')} onClick={() => onChoose(meeting.date)}>
          <IonCardContent className="card__datetime--content">
            <IonDatetime style={{color: 'rgba(91, 91, 91, 1)', fontFamily: 'Montserrat'}} className="datetime__text" value={meeting.date} display-format="DDD" readonly={true}></IonDatetime>
            <IonDatetime style={{color: 'rgba(29, 32, 31, 1)', fontWeight: '700', fontSize: '24px'}} className="datetime__text" value={meeting.date} displayFormat="DD" day-values="string" readonly={true}></IonDatetime>
          </IonCardContent>
        </IonCard>
      );
};

export default CardDate;