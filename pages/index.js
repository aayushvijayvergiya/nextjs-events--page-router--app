import Head from 'next/head';

import EventList from "@/components/events/event-list";
import { getFeaturedEvents } from "@/services/api-util";
import NewsletterRegistration from '@/components/input/newsletter-registration';
/* import { getFeaturedEvents } from "@/dummy-data"; */

function HomePage (props) {
    // const featureEvents = getFeaturedEvents();

    return (
        <div>
            <Head>
                <title>Next Js Events App</title>
                <meta name='description' content='A next js app'/>
            </Head>
            <NewsletterRegistration />
            <EventList items={props.events} />
        </div>
    )
}

export async function getStaticProps() {
    const featuredEvents = await getFeaturedEvents() 
    return {
        props: {
            events: featuredEvents
        },
        revalidate: 30
    }
}

export default HomePage;