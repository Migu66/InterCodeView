import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import { prisma } from "@/lib/prisma";
import { generateToken, setAuthCookie } from "@/lib/auth";

// Configurar Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth-token");

        if (!token) {
            return NextResponse.json(
                { message: "No autenticado" },
                { status: 401 }
            );
        }

        const decoded = jwt.verify(token.value, process.env.JWT_SECRET!) as {
            id: string;
        };

        // Obtener la imagen del FormData
        const formData = await request.formData();
        const file = formData.get("avatar") as File;

        if (!file) {
            return NextResponse.json(
                { message: "No se ha enviado ninguna imagen" },
                { status: 400 }
            );
        }

        // Validar tipo de archivo
        const validTypes = [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "image/webp",
        ];
        if (!validTypes.includes(file.type)) {
            return NextResponse.json(
                {
                    message:
                        "Tipo de archivo no válido. Solo se permiten imágenes (JPEG, JPG, PNG, WebP)",
                },
                { status: 400 }
            );
        }

        // Validar tamaño (máximo 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            return NextResponse.json(
                { message: "La imagen es demasiado grande. Máximo 5MB" },
                { status: 400 }
            );
        }

        // Convertir el archivo a buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Subir a Cloudinary usando un Promise
        const uploadResult = await new Promise<{
            secure_url: string;
            public_id: string;
        }>((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    {
                        folder: "intercodeview/avatars",
                        public_id: `avatar_${decoded.id}`,
                        overwrite: true,
                        transformation: [
                            {
                                width: 400,
                                height: 400,
                                crop: "fill",
                                gravity: "face",
                            },
                            { quality: "auto" },
                        ],
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else
                            resolve(
                                result as {
                                    secure_url: string;
                                    public_id: string;
                                }
                            );
                    }
                )
                .end(buffer);
        });

        // Actualizar el avatar del usuario en la base de datos
        const updatedUser = await prisma.user.update({
            where: { id: decoded.id },
            data: { avatarUrl: uploadResult.secure_url },
            select: {
                id: true,
                name: true,
                email: true,
                avatarUrl: true,
            },
        });

        // Generar nuevo token con los datos actualizados
        const newToken = generateToken({
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            avatarUrl: updatedUser.avatarUrl,
        });
        await setAuthCookie(newToken);

        return NextResponse.json({
            message: "Avatar actualizado correctamente",
            user: updatedUser,
        });
    } catch (error) {
        return NextResponse.json(
            {
                message: "Error al subir la imagen",
                error:
                    error instanceof Error
                        ? error.message
                        : "Error desconocido",
            },
            { status: 500 }
        );
    }
}

export async function DELETE() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth-token");

        if (!token) {
            return NextResponse.json(
                { message: "No autenticado" },
                { status: 401 }
            );
        }

        const decoded = jwt.verify(token.value, process.env.JWT_SECRET!) as {
            id: string;
        };

        // Obtener el usuario actual
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
        });

        if (!user || !user.avatarUrl) {
            return NextResponse.json(
                { message: "No hay avatar para eliminar" },
                { status: 400 }
            );
        }

        // Eliminar de Cloudinary
        try {
            await cloudinary.uploader.destroy(
                `intercodeview/avatars/avatar_${decoded.id}`
            );
        } catch (cloudinaryError) {
            console.error("Error al eliminar de Cloudinary:", cloudinaryError);
        }

        // Actualizar el usuario
        const updatedUser = await prisma.user.update({
            where: { id: decoded.id },
            data: { avatarUrl: null },
            select: {
                id: true,
                name: true,
                email: true,
                avatarUrl: true,
            },
        });

        // Generar nuevo token con los datos actualizados
        const newToken = generateToken({
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            avatarUrl: updatedUser.avatarUrl,
        });
        await setAuthCookie(newToken);

        return NextResponse.json({
            message: "Avatar eliminado correctamente",
            user: updatedUser,
        });
    } catch (error) {
        return NextResponse.json(
            {
                message: "Error al eliminar el avatar",
                error:
                    error instanceof Error
                        ? error.message
                        : "Error desconocido",
            },
            { status: 500 }
        );
    }
}
