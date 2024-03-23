import { Grid,  GridColumn } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { observer } from 'mobx-react-lite';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedSideBar from './ActivityDetailedSideBar';




export default observer( function ActivityDetails() {
  const{activityStore}= useStore();
  const {selectedActivity:activity,loadActivity, loadingInitial} = activityStore;

  const{id}= useParams();

  useEffect(() => {
    if(id)loadActivity(id);
  },[id,loadActivity])

  if(loadingInitial || !activity) return <LoadingComponent/>;

    return (

      <Grid>
        <GridColumn width={10}>
          <ActivityDetailedHeader activity={activity} />
          <ActivityDetailedInfo  activity={activity}/>
          <ActivityDetailedChat />

        </GridColumn>
        <GridColumn width={6}>
          <ActivityDetailedSideBar activity={activity} />

</GridColumn>
      </Grid>
      //   <Card>
      //   <Image src={`/assets/categoryImages/${activity.category}.jpg`}/>
      //   <Card.Content>
      //     <Card.Header>{activity.title}</Card.Header>
      //     <Card.Meta>
      //       <span >{activity.date}</span>
      //     </Card.Meta>
      //     <Card.Description>
      //      {activity.description}
      //     </Card.Description>
      //   </Card.Content>
      //   <Card.Content extra>
      //     <ButtonGroup widths='2'>
      //       <Button as={Link} to={`/manage/${activity.id}`}  basic color='blue' content='Edit' />
      //       <Button as={Link} to='/activities' basic color='blue' content='Cancel' />
            
      //       </ButtonGroup>
      //   </Card.Content>
      // </Card>


    )
})