import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import Textarea from '@/Components/Textarea';
import SelectInput from '@/Components/SelectInput';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        // Informacin general
        email: '',
        category: '',

        // Informacin del participante o representante
        name: '',
        role: '',
        organization: '',
        city_country: '',
        secondary_email: '',
        phone: '',
        linkedin: '',

        // Descripcin del proyecto
        project_title: '',
        project_description: '',
        project_results: '',
        project_uniqueness: '',

        // Material de apoyo
        support_links: [''],
        complementary_files: [],
        photos: [],

        // Referencia o contacto
        reference_name: '',
        reference_role: '',
        reference_organization: '',
        reference_email: '',
    });

    const addSupportLink = () => {
        setData('support_links', [...data.support_links, '']);
    };

    const removeSupportLink = (index) => {
        const newLinks = data.support_links.filter((_, i) => i !== index);
        setData('support_links', newLinks.length > 0 ? newLinks : ['']);
    };

    const updateSupportLink = (index, value) => {
        const newLinks = [...data.support_links];
        newLinks[index] = value;
        setData('support_links', newLinks);
    };

    const handleFileChange = (e, fieldName) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setData(fieldName, files);
        }
    };

    const submit = (e) => {
        e.preventDefault();

        // Convertir los archivos a FormData para el envo
        const formData = new FormData();

        // Agregar todos los campos excepto archivos
        Object.keys(data).forEach(key => {
            if (key === 'complementary_files' || key === 'photos') {
                // Agregar archivos
                data[key].forEach((file, index) => {
                    formData.append(`${key}[]`, file);
                });
            } else if (key === 'support_links') {
                // Convertir array de links a JSON
                formData.append(key, JSON.stringify(data[key].filter(link => link.trim() !== '')));
            } else {
                formData.append(key, data[key] || '');
            }
        });

        post(route('participants.store'), {
            data: formData,
            forceFormData: true,
        });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Head title="Registro de Participante" />

            {/* Header */}
            <div className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <Link href="/">
                            <ApplicationLogo className="h-12 w-12 fill-current text-gray-500" />
                        </Link>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            Premios ANPR
                        </h1>
                    </div>
                </div>
            </div>

            <div className="py-12">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="mb-6 text-2xl font-bold">
                                Formulario de Registro de Participante
                            </h2>

                            <form onSubmit={submit} className="space-y-8">
                                {/* SECCIN 1: Informacin General */}
                                <div className="rounded-lg border border-gray-200 p-6">
                                    <h3 className="mb-4 text-lg font-semibold text-gray-800">
                                        1. Informacin General
                                    </h3>

                                    <div className="space-y-4">
                                        <div>
                                            <InputLabel htmlFor="email" value="Email *" />
                                            <TextInput
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('email', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.email} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="category" value="Categora *" />
                                            <SelectInput
                                                id="category"
                                                value={data.category}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('category', e.target.value)}
                                                required
                                            >
                                                <option value="">Seleccione una categora</option>
                                                <option value="comunicacion_interna">Comunicacin Interna</option>
                                                <option value="comunicacion_externa">Comunicacin Externa</option>
                                                <option value="comunicacion_digital">Comunicacin Digital</option>
                                                <option value="gestion_crisis">Gestin de Crisis</option>
                                                <option value="responsabilidad_social">Responsabilidad Social</option>
                                                <option value="innovacion">Innovacin</option>
                                            </SelectInput>
                                            <InputError message={errors.category} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                {/* SECCIN 2: Informacin del Participante */}
                                <div className="rounded-lg border border-gray-200 p-6">
                                    <h3 className="mb-4 text-lg font-semibold text-gray-800">
                                        2. Informacin del Participante o Representante
                                    </h3>

                                    <div className="space-y-4">
                                        <div>
                                            <InputLabel htmlFor="name" value="Nombre Completo *" />
                                            <TextInput
                                                id="name"
                                                value={data.name}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('name', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.name} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="role" value="Cargo" />
                                            <TextInput
                                                id="role"
                                                value={data.role}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('role', e.target.value)}
                                            />
                                            <InputError message={errors.role} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="organization" value="Organizacin" />
                                            <TextInput
                                                id="organization"
                                                value={data.organization}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('organization', e.target.value)}
                                            />
                                            <InputError message={errors.organization} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="city_country" value="Ciudad, Pas" />
                                            <TextInput
                                                id="city_country"
                                                value={data.city_country}
                                                className="mt-1 block w-full"
                                                placeholder="ej: Ciudad de Mxico, Mxico"
                                                onChange={(e) => setData('city_country', e.target.value)}
                                            />
                                            <InputError message={errors.city_country} className="mt-2" />
                                        </div>

                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <div>
                                                <InputLabel htmlFor="secondary_email" value="Email Secundario" />
                                                <TextInput
                                                    id="secondary_email"
                                                    type="email"
                                                    value={data.secondary_email}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) => setData('secondary_email', e.target.value)}
                                                />
                                                <InputError message={errors.secondary_email} className="mt-2" />
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="phone" value="Telfono" />
                                                <TextInput
                                                    id="phone"
                                                    type="tel"
                                                    value={data.phone}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) => setData('phone', e.target.value)}
                                                />
                                                <InputError message={errors.phone} className="mt-2" />
                                            </div>
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="linkedin" value="LinkedIn" />
                                            <TextInput
                                                id="linkedin"
                                                type="url"
                                                value={data.linkedin}
                                                className="mt-1 block w-full"
                                                placeholder="https://linkedin.com/in/..."
                                                onChange={(e) => setData('linkedin', e.target.value)}
                                            />
                                            <InputError message={errors.linkedin} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                {/* SECCIN 3: Descripcin del Proyecto */}
                                <div className="rounded-lg border border-gray-200 p-6">
                                    <h3 className="mb-4 text-lg font-semibold text-gray-800">
                                        3. Descripcin del Proyecto
                                    </h3>

                                    <div className="space-y-4">
                                        <div>
                                            <InputLabel htmlFor="project_title" value="Ttulo del Proyecto *" />
                                            <TextInput
                                                id="project_title"
                                                value={data.project_title}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('project_title', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.project_title} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="project_description" value="Descripcin del Proyecto" />
                                            <Textarea
                                                id="project_description"
                                                value={data.project_description}
                                                className="mt-1 block w-full"
                                                rows="4"
                                                placeholder="Describe el proyecto, sus objetivos y alcance..."
                                                onChange={(e) => setData('project_description', e.target.value)}
                                            />
                                            <InputError message={errors.project_description} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="project_results" value="Resultados Obtenidos" />
                                            <Textarea
                                                id="project_results"
                                                value={data.project_results}
                                                className="mt-1 block w-full"
                                                rows="4"
                                                placeholder="Describe los resultados, impacto y mtricas relevantes..."
                                                onChange={(e) => setData('project_results', e.target.value)}
                                            />
                                            <InputError message={errors.project_results} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="project_uniqueness" value="Qu hace nico a este proyecto?" />
                                            <Textarea
                                                id="project_uniqueness"
                                                value={data.project_uniqueness}
                                                className="mt-1 block w-full"
                                                rows="4"
                                                placeholder="Explica qu diferencia a este proyecto de otros similares..."
                                                onChange={(e) => setData('project_uniqueness', e.target.value)}
                                            />
                                            <InputError message={errors.project_uniqueness} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                {/* SECCIN 4: Material de Apoyo */}
                                <div className="rounded-lg border border-gray-200 p-6">
                                    <h3 className="mb-4 text-lg font-semibold text-gray-800">
                                        4. Material de Apoyo
                                    </h3>

                                    <div className="space-y-6">
                                        {/* Enlaces de apoyo */}
                                        <div>
                                            <InputLabel value="Enlaces de Apoyo" />
                                            <p className="mt-1 text-sm text-gray-600">
                                                Agrega enlaces a videos, artculos, sitios web, etc.
                                            </p>
                                            <div className="mt-2 space-y-2">
                                                {data.support_links.map((link, index) => (
                                                    <div key={index} className="flex gap-2">
                                                        <TextInput
                                                            type="url"
                                                            value={link}
                                                            className="block w-full"
                                                            placeholder="https://..."
                                                            onChange={(e) => updateSupportLink(index, e.target.value)}
                                                        />
                                                        {data.support_links.length > 1 && (
                                                            <SecondaryButton
                                                                type="button"
                                                                onClick={() => removeSupportLink(index)}
                                                            >
                                                                Eliminar
                                                            </SecondaryButton>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            <SecondaryButton
                                                type="button"
                                                onClick={addSupportLink}
                                                className="mt-2"
                                            >
                                                + Agregar enlace
                                            </SecondaryButton>
                                            <InputError message={errors.support_links} className="mt-2" />
                                        </div>

                                        {/* Archivos complementarios */}
                                        <div>
                                            <InputLabel htmlFor="complementary_files" value="Archivos Complementarios" />
                                            <p className="mt-1 text-sm text-gray-600">
                                                Documentos, presentaciones, PDFs, etc.
                                            </p>
                                            <input
                                                id="complementary_files"
                                                type="file"
                                                multiple
                                                className="mt-2 block w-full text-sm text-gray-500
                                                    file:mr-4 file:rounded-md file:border-0
                                                    file:bg-indigo-50 file:px-4 file:py-2
                                                    file:text-sm file:font-semibold
                                                    file:text-indigo-700 hover:file:bg-indigo-100"
                                                onChange={(e) => handleFileChange(e, 'complementary_files')}
                                                accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                                            />
                                            <p className="mt-1 text-xs text-gray-500">
                                                Formatos permitidos: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX
                                            </p>
                                            <InputError message={errors.complementary_files} className="mt-2" />
                                        </div>

                                        {/* Fotos */}
                                        <div>
                                            <InputLabel htmlFor="photos" value="Fotografas" />
                                            <p className="mt-1 text-sm text-gray-600">
                                                Imgenes relacionadas con el proyecto
                                            </p>
                                            <input
                                                id="photos"
                                                type="file"
                                                multiple
                                                className="mt-2 block w-full text-sm text-gray-500
                                                    file:mr-4 file:rounded-md file:border-0
                                                    file:bg-indigo-50 file:px-4 file:py-2
                                                    file:text-sm file:font-semibold
                                                    file:text-indigo-700 hover:file:bg-indigo-100"
                                                onChange={(e) => handleFileChange(e, 'photos')}
                                                accept="image/*"
                                            />
                                            <p className="mt-1 text-xs text-gray-500">
                                                Formatos permitidos: JPG, PNG, GIF, etc.
                                            </p>
                                            <InputError message={errors.photos} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                {/* SECCIN 5: Referencia o Contacto */}
                                <div className="rounded-lg border border-gray-200 p-6">
                                    <h3 className="mb-4 text-lg font-semibold text-gray-800">
                                        5. Referencia o Contacto (Opcional)
                                    </h3>

                                    <div className="space-y-4">
                                        <div>
                                            <InputLabel htmlFor="reference_name" value="Nombre de la Referencia" />
                                            <TextInput
                                                id="reference_name"
                                                value={data.reference_name}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('reference_name', e.target.value)}
                                            />
                                            <InputError message={errors.reference_name} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="reference_role" value="Cargo de la Referencia" />
                                            <TextInput
                                                id="reference_role"
                                                value={data.reference_role}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('reference_role', e.target.value)}
                                            />
                                            <InputError message={errors.reference_role} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="reference_organization" value="Organizacin de la Referencia" />
                                            <TextInput
                                                id="reference_organization"
                                                value={data.reference_organization}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('reference_organization', e.target.value)}
                                            />
                                            <InputError message={errors.reference_organization} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="reference_email" value="Email de la Referencia" />
                                            <TextInput
                                                id="reference_email"
                                                type="email"
                                                value={data.reference_email}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData('reference_email', e.target.value)}
                                            />
                                            <InputError message={errors.reference_email} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                {/* Botn de envo */}
                                <div className="flex items-center justify-end border-t border-gray-200 pt-6">
                                    <PrimaryButton disabled={processing}>
                                        {processing ? 'Enviando...' : 'Registrar Participacin'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}