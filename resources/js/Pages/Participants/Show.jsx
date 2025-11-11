import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ participant }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Detalle del Participante
                </h2>
            }
        >
            <Head title={`Participante - ${participant.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Botón de regreso */}
                    <div className="mb-4">
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Volver al Dashboard
                        </Link>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Encabezado con nombre del participante */}
                            <div className="mb-8 border-b border-gray-200 pb-4">
                                <h1 className="text-3xl font-bold text-gray-900">{participant.name}</h1>
                                <p className="mt-2 text-sm text-gray-600">
                                    Registrado el {new Date(participant.created_at).toLocaleDateString('es-ES', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>

                            <div className="space-y-8">
                                {/* SECCIÓN 1: Información General */}
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4 border-l-4 border-indigo-600 pl-4">
                                        1. Información General
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Email</p>
                                            <p className="mt-1 text-base text-gray-900">{participant.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Categoría</p>
                                            <p className="mt-1 text-base text-gray-900">{participant.category}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* SECCIÓN 2: Información del Participante */}
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4 border-l-4 border-indigo-600 pl-4">
                                        2. Información del Participante o Representante
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Nombre Completo</p>
                                            <p className="mt-1 text-base text-gray-900">{participant.name}</p>
                                        </div>
                                        {participant.role && (
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Cargo</p>
                                                <p className="mt-1 text-base text-gray-900">{participant.role}</p>
                                            </div>
                                        )}
                                        {participant.organization && (
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Organización</p>
                                                <p className="mt-1 text-base text-gray-900">{participant.organization}</p>
                                            </div>
                                        )}
                                        {participant.city_country && (
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Ciudad, País</p>
                                                <p className="mt-1 text-base text-gray-900">{participant.city_country}</p>
                                            </div>
                                        )}
                                        {participant.secondary_email && (
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Email Secundario</p>
                                                <p className="mt-1 text-base text-gray-900">{participant.secondary_email}</p>
                                            </div>
                                        )}
                                        {participant.phone && (
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Teléfono</p>
                                                <p className="mt-1 text-base text-gray-900">{participant.phone}</p>
                                            </div>
                                        )}
                                        {participant.linkedin && (
                                            <div className="md:col-span-2">
                                                <p className="text-sm font-medium text-gray-500">LinkedIn</p>
                                                <a
                                                    href={participant.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mt-1 text-base text-indigo-600 hover:text-indigo-800"
                                                >
                                                    {participant.linkedin}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* SECCIÓN 3: Descripción del Proyecto */}
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4 border-l-4 border-indigo-600 pl-4">
                                        3. Descripción del Proyecto
                                    </h3>
                                    <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Título del Proyecto</p>
                                            <p className="mt-1 text-lg font-semibold text-gray-900">{participant.project_title}</p>
                                        </div>
                                        {participant.project_description && (
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Descripción</p>
                                                <p className="mt-1 text-base text-gray-900 whitespace-pre-wrap">{participant.project_description}</p>
                                            </div>
                                        )}
                                        {participant.project_results && (
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Resultados Obtenidos</p>
                                                <p className="mt-1 text-base text-gray-900 whitespace-pre-wrap">{participant.project_results}</p>
                                            </div>
                                        )}
                                        {participant.project_uniqueness && (
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Qué hace único a este proyecto</p>
                                                <p className="mt-1 text-base text-gray-900 whitespace-pre-wrap">{participant.project_uniqueness}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* SECCIÓN 4: Material de Apoyo */}
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4 border-l-4 border-indigo-600 pl-4">
                                        4. Material de Apoyo
                                    </h3>
                                    <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
                                        {/* Enlaces de apoyo */}
                                        {participant.support_links && participant.support_links.length > 0 && (
                                            <div>
                                                <p className="text-sm font-medium text-gray-500 mb-2">Enlaces de Apoyo</p>
                                                <ul className="space-y-2">
                                                    {participant.support_links.map((link, index) => (
                                                        <li key={index}>
                                                            <a
                                                                href={link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-indigo-600 hover:text-indigo-800 break-all"
                                                            >
                                                                {link}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Archivos complementarios */}
                                        {participant.complementary_files && participant.complementary_files.length > 0 && (
                                            <div>
                                                <p className="text-sm font-medium text-gray-500 mb-2">Archivos Complementarios</p>
                                                <ul className="space-y-2">
                                                    {participant.complementary_files.map((file, index) => (
                                                        <li key={index} className="flex items-center text-gray-900">
                                                            <svg className="w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                                                            </svg>
                                                            <a
                                                                href={`/storage/${file.path}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-indigo-600 hover:text-indigo-800"
                                                            >
                                                                {file.original_name}
                                                            </a>
                                                            <span className="ml-2 text-sm text-gray-500">
                                                                ({(file.size / 1024).toFixed(2)} KB)
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Fotografías */}
                                        {participant.photos && participant.photos.length > 0 && (
                                            <div>
                                                <p className="text-sm font-medium text-gray-500 mb-3">Fotografías</p>
                                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                                    {participant.photos.map((photo, index) => (
                                                        <div key={index} className="relative group">
                                                            <a
                                                                href={`/storage/${photo.path}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <img
                                                                    src={`/storage/${photo.path}`}
                                                                    alt={photo.original_name}
                                                                    className="w-full h-32 object-cover rounded-lg border border-gray-300 group-hover:opacity-75 transition-opacity"
                                                                />
                                                                <div className="mt-1 text-xs text-gray-500 truncate">
                                                                    {photo.original_name}
                                                                </div>
                                                            </a>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {!participant.support_links?.length &&
                                         !participant.complementary_files?.length &&
                                         !participant.photos?.length && (
                                            <p className="text-gray-500 italic">No se adjuntó material de apoyo.</p>
                                        )}
                                    </div>
                                </div>

                                {/* SECCIÓN 5: Referencia o Contacto */}
                                {(participant.reference_name || participant.reference_email) && (
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-4 border-l-4 border-indigo-600 pl-4">
                                            5. Referencia o Contacto
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg">
                                            {participant.reference_name && (
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">Nombre</p>
                                                    <p className="mt-1 text-base text-gray-900">{participant.reference_name}</p>
                                                </div>
                                            )}
                                            {participant.reference_role && (
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">Cargo</p>
                                                    <p className="mt-1 text-base text-gray-900">{participant.reference_role}</p>
                                                </div>
                                            )}
                                            {participant.reference_organization && (
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">Organización</p>
                                                    <p className="mt-1 text-base text-gray-900">{participant.reference_organization}</p>
                                                </div>
                                            )}
                                            {participant.reference_email && (
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500">Email</p>
                                                    <p className="mt-1 text-base text-gray-900">{participant.reference_email}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Botón de regreso inferior */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <Link
                                    href="/dashboard"
                                    className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    Volver al Dashboard
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
