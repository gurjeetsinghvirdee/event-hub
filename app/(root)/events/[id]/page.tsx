import { SearchParamProps } from "@/types";
import { getEventById } from '../../../../lib/actions/event.actions';

const EventDetails = async ({ params: { id } }: SearchParamProps) => {

    const event = await getEventById(id);
    return (
        <div>
            EventDetails Page
        </div>
    )
}

export default EventDetails;