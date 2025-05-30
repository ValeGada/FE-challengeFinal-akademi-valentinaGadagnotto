export const handleInputChange = (formData, setFormData) => (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value // Propiedad computada --> se usa el valor de la variable 'name' como nombre de la propiedad 
  });
};

export const handleSelectChange = (field, formData, setFormData) => (e) => {
  const { value } = e.target;
  setFormData({
    ...formData,
    [field]: value
  });
};