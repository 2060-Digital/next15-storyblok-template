"use client"

import * as yup from "yup"
import "yup-phone-lite"
import { Form, Input, Textarea, Radio, Checkbox } from "@/components/Form"

export default function FormConfig() {

    const required = "This is required."
    const nameValidation = yup.string().required(required)
  
    const formConfig = {
      mode: "onChange",
      schema: yup.object().shape({
        First: nameValidation,
        Last: nameValidation,
        Consent: nameValidation,
        Pets: nameValidation,
        Notes: nameValidation,
        Email: yup.string().email("Enter a valid email address.").required(required),
        Phone: yup.string().phone("US", "Enter a valid phone number.").required(required),
      }),
    }
  
  

  return ( 
     
        <div className="container">
           <h1 className="text-center font-sans text-5xl">Landing Page Boilerplate</h1>
          <div className="content max-w-lg mx-auto">
            <Form name="request-information" config={formConfig}>
              <Input name="First" label="First Name" type="text" />
              <Input name="Last" label="Last Name" type="text" />
              <Input name="Phone" label="Mobile Phone" type="tel" />
              <Input name="Email" label="Email Address" type="text" />
              <Radio name="Consent" label="Do You Consent?" options={["Yes", "No"]} />
              <Checkbox name="Pets" label="I enjoy" options={["Cats", "Dogs"]} />
              <Textarea name="Notes" label="Notes (optional)" className="h-52" />
              <button type="submit">Submit Request</button>
            </Form>
          </div>
        </div> 
  )
}