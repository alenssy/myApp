import React from 'react';
import { IonDatetime, IonCard, IonCardContent} from '@ionic/react';
import IData from '../IData';

//definition of element props
type CardTimeProps = {
    meeting: IData,
    onChoose(time: string): void,
    timeActive: string
  }

//render functional component
const CardTime: React.FC<CardTimeProps> = ({meeting, onChoose, timeActive}) => {

    let classesIonCard: Array<string> = ['card__datetime'];

    //add active class if condition is true
    timeActive === meeting.date ? classesIonCard.push('active') : classesIonCard.push('');

  return (
        <IonCard className={classesIonCard.join(' ')} onClick={() => onChoose(meeting.date)}>
            <IonCardContent className="card__datetime--content">
                <IonDatetime className="datetime__text" style={{color: 'rgba(193, 193, 193, 1)', fontFamily: 'Montserrat', fontSize: '24px'}} value={meeting.date} displayFormat="HH:mm" readonly={true}></IonDatetime>
            </IonCardContent>
        </IonCard>);
};

export default CardTime;