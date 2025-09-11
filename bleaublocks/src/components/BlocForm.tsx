"use client";

import { useState, useEffect } from "react";
import { ApiService } from "@/services/api";
import { useFormState } from "@/hooks/useFormState";
import {
  STARTING_POSITION_OPTIONS,
  STYLE_OPTIONS,
  LEVEL_OPTIONS,
} from "@/constants/blocForm";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";
import FormTextarea from "@/components/FormTextarea";
import AlertMessage from "@/components/AlertMessage";
import { Area } from "@/types";

interface BlocFormProps {
  onSubmitSuccess?: () => void;
}

export default function BlocForm({ onSubmitSuccess }: BlocFormProps) {
  const { formData, updateField, isFormValid, resetForm } = useFormState();
  const [areas, setAreas] = useState<Area[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const areasData = await ApiService.getAreas();
        setAreas(areasData);
      } catch (error) {
        console.error("Erreur lors du chargement des zones:", error);
      }
    };
    fetchAreas();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsSubmitting(true);
    setMessage(null);

    try {
      await ApiService.createBloc({
        name: formData.name,
        description: formData.description,
        starting_position: formData.starting_position,
        style: formData.style,
        level: formData.level,
        area: parseInt(formData.area),
        lat: parseFloat(formData.lat),
        lng: parseFloat(formData.lng),
        img_url: formData.img_url || "",
      });

      setMessage({ type: "success", text: "Bloc créé avec succès !" });
      resetForm();
      onSubmitSuccess?.();
    } catch (error) {
      setMessage({
        type: "error",
        text: "Erreur lors de la création du bloc. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const areaOptions = areas.map((area) => ({
    value: area.id.toString(),
    label: area.name,
  }));

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <AlertMessage type={message.type} title="" message={message.text} />
      )}

      <FormInput
        label="Nom du bloc"
        name="name"
        type="text"
        value={formData.name}
        onChange={(e) => updateField("name", e.target.value)}
        placeholder="Entrez le nom du bloc"
        required
      />

      <FormSelect
        label="Zone"
        name="area"
        value={formData.area}
        onChange={(e) => updateField("area", e.target.value)}
        options={areaOptions}
        placeholder="Sélectionnez une zone"
        required
      />

      <FormSelect
        label="Style"
        name="style"
        value={formData.style}
        onChange={(e) => updateField("style", e.target.value)}
        options={STYLE_OPTIONS}
        placeholder="Sélectionnez un style"
        required
      />

      <FormSelect
        label="Niveau"
        name="level"
        value={formData.level}
        onChange={(e) => updateField("level", e.target.value)}
        options={LEVEL_OPTIONS}
        placeholder="Sélectionnez un niveau"
        required
      />

      <FormSelect
        label="Position de départ"
        name="starting_position"
        value={formData.starting_position}
        onChange={(e) => updateField("starting_position", e.target.value)}
        options={STARTING_POSITION_OPTIONS}
        placeholder="Sélectionnez une position"
        required
      />

      <FormTextarea
        label="Description"
        name="description"
        value={formData.description}
        onChange={(e) => updateField("description", e.target.value)}
        placeholder="Décrivez le bloc, les prises, la technique..."
        rows={4}
        required
      />

      <FormInput
        label="URL de l'image (optionnel)"
        name="img_url"
        type="url"
        value={formData.img_url}
        onChange={(e) => updateField("img_url", e.target.value)}
        placeholder="https://exemple.com/image.jpg"
      />

      <div className="space-y-4">
        <label className="block text-sm font-medium text-[var(--background)]">
          Position GPS
        </label>
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Latitude"
            name="lat"
            type="number"
            step="any"
            value={formData.lat}
            onChange={(e) => updateField("lat", e.target.value)}
            placeholder="48.4199"
            helpText="Coordonnée latitude"
            required
          />
          <FormInput
            label="Longitude"
            name="lng"
            type="number"
            step="any"
            value={formData.lng}
            onChange={(e) => updateField("lng", e.target.value)}
            placeholder="2.6722"
            helpText="Coordonnée longitude"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!isFormValid() || isSubmitting}
        className="w-full bg-[var(--thirdcolor)] text-[var(--background)] py-3 px-4 rounded-lg hover:bg-[var(--thirdcolor)]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? "Création en cours..." : "Créer le bloc"}
      </button>
    </form>
  );
}
