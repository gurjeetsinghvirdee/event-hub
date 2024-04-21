'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const orangeButton = {
    background: "linear-gradient(to right, #ff4903, #FF7700, #FF8811)",
    color: "#fff",
    transition: "background 0.3s ease, color 0.3s ease", // Add transition for smooth effect
    '&:active': {
        filter: "brightness(90%)" // Adjust brightness to indicate click
    }
};

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters long."
    })
})

type EventFormProps = {
    userId: string
    type: "Create" | "Update"
}

const EventForm = ({ userId, type }: EventFormProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field}) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="username" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="active:scale-95" style={orangeButton}>Submit</Button>
            </form>
        </Form>
    )
}

export default EventForm;