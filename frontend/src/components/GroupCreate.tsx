import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroup } from "../api/group";
import { useState } from "react";
import { AxiosError } from "axios";
import { APIErrorResponse } from "../../../src/types";

const GroupCreate = () => {
  const queryClient = useQueryClient();
  const emptyForm = {
    name: "",
    password: "",
    organizer: { name: "", email: "" },
  };
  const [formData, setFormData] = useState(emptyForm);
  const { mutate, isPending, error } = useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      setFormData(emptyForm);
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name.includes(".")) {
      const key = name.replace("organizer.", "");
      setFormData((prevData) => ({
        ...prevData,
        organizer: { ...prevData.organizer, [key]: value },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(formData);
  };

  return (
    <div>
      <h1>Create Group</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Group Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <div>
          <input
            type="text"
            name="organizer.name"
            placeholder="Organizer Name"
            value={formData.organizer.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="organizer.email"
            placeholder="Organizer Email"
            value={formData.organizer.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create"}
        </button>
        {error && (
          <div className="error">
            Error:{" "}
            {(error as AxiosError<APIErrorResponse>).response?.data.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default GroupCreate;
