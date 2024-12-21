import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { addNewParticipant } from "../api/participant";
import { AxiosError } from "axios";
import { APIErrorResponse } from "../../../src/types";

const AddParticipant = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const queryClient = useQueryClient();

  const { isPending, error, mutate } = useMutation({
    mutationFn: addNewParticipant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participant", id] });
      setFormData({ name: "", email: "" });
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ groupId: id!, ...formData });
  };
  return (
    <div>
      <h1>Add Participant</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <button type="submit" disabled={isPending}>
          {isPending ? "Adding..." : "Add"}
        </button>
        {error && (
          <div className="error">
            {(error as AxiosError<APIErrorResponse>).response?.data.message}
            {(error as AxiosError<APIErrorResponse>).response?.data.detail}
          </div>
        )}
      </form>
    </div>
  );
};

export default AddParticipant;
