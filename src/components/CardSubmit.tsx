import React from 'react';
import {IonDatetime, IonCard, IonCardContent, IonLabel, IonButton} from '@ionic/react';

//definition of element props
type CardSubmitProps = {
    dateActive: string,
    timeActive: string,
    onSubmit(): void
  }

//render functional component
const CardSubmit: React.FC<CardSubmitProps> = ({dateActive, timeActive, onSubmit}) => {
  return (
        <IonCard>
          <IonCardContent>
            <div className="submit__datetime">
              <div className="submit__datetime--block">
                  <IonLabel>Дата</IonLabel>
                  <IonDatetime style={{fontFamily: 'Montserrat', color: 'rgba(29, 32, 31, 1)', fontSize: '20px', fontWeight: '700'}} className="datetime__text" value={dateActive} display-format="DD MMMM"  readonly={true}></IonDatetime>
              </div>
              <div className="submit__datetime--block">
                  <IonLabel>Время</IonLabel>
                  <IonDatetime style={{fontFamily: 'Montserrat', color: 'rgba(29, 32, 31, 1)', fontSize: '20px', fontWeight: '700'}} className="datetime__text" value={timeActive} displayFormat="HH:mm" readonly={true}></IonDatetime>
              </div>
            </div>
            <IonButton className="btn__submit" onClick={onSubmit}>ЗАПИСАТЬСЯ НА БЕСПЛАТНУЮ ВСТРЕЧУ</IonButton>
          </IonCardContent>
        </IonCard>);
};

export default CardSubmit;