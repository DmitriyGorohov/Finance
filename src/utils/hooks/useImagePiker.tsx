import { useState } from 'react';
import {
    launchImageLibrary,
} from 'react-native-image-picker';

interface UseImagePickerResult {
    pickFromGallery: () => void;
    imageUri: string | null;
}

export const useImagePicker = (): UseImagePickerResult => {
    const [imageUri, setImageUri] = useState<string | null>(null);

    // Функция для выбора изображения из галереи
    const pickFromGallery = async () => {
        const resultsImage = await launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 1,
            quality: 1,
        });

        if (resultsImage?.assets && resultsImage.assets.length > 0) {
            setImageUri(resultsImage.assets[0].uri || null);
        } else {
            setImageUri(null);
            console.error(
                'Ошибка выбора изображения:',
                resultsImage.errorMessage || 'Неизвестная ошибка'
            );
        }
    };

    return {
        pickFromGallery,
        imageUri,
    };
};
