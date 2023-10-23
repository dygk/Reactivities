import { Button, Form, FormInput, FormTextArea, Segment } from "semantic-ui-react";
import {  useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { Formik } from "formik";


export default observer(function ActivityForm() {
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;

    const { id } = useParams();
    const navigate = useNavigate();
    const [activity, setActivity] = useState<Activity>(
        {
            id: '',
            title: '',
            category: '',
            description: '',
            date: '',
            city: '',
            venue: ''
        }
    );

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity])

    // function handleSubmit() {
    //     if (!activity.id) {
    //         activity.id = uuid();
    //         createActivity(activity).then(() => navigate(`/activities/${activity.id}`))
    //     } else {

    //         updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
    //     }
    //     activity.id ? updateActivity(activity) : createActivity(activity);
    // }

    // function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //     const { name, value } = event.target;
    //     setActivity({ ...activity, [name]: value })
    // }

    if (loadingInitial) return <LoadingComponent content="Loading Activity..." />
    return (<Segment clearing>
        <Formik  enableReinitialize initialValues={activity} onSubmit={values=> console.log(values)}>
{(
    {values:activity, handleChange,handleSubmit}) => (
        <Form onSubmit={handleSubmit} autoComplete='off'>
        <FormInput placeholder='Title' value={activity.title} name='title' onChange={handleChange} />
        <FormTextArea placeholder='Description' value={activity.description} name='description' onChange={handleChange} />
        <FormInput placeholder='Category' value={activity.category} name='category' onChange={handleChange} />
        <FormInput type="date" placeholder='Date' value={activity.date} name='date' onChange={handleChange} />
        <FormInput placeholder='City' value={activity.city} name='city' onChange={handleChange} />
        <FormInput placeholder='Venue' value={activity.venue} name='venue' onChange={handleChange} />
        <Button loading={loading} floated='right' positive type='submit' content='Submit' />
        <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
    </Form>

    )}

        </Formik>
       
    </Segment>

    )
})