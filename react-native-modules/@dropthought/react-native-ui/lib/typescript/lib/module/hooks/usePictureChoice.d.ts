export function usePictureChoice(question: any, onFeedback: any, feedback: any): {
    images: any;
    otherPictureEnable: boolean;
    otherPictureAnswer: {
        image: any;
        value: any;
    };
    setOtherPictureAnswerText: (text: any) => void;
    setOtherPictureAnswerUrl: (url: any) => void;
    otherPictureSelected: boolean;
    setOtherPictureSelected: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    selectIndex: any;
    onSelectIndex: (selected: any) => void;
    replaceSelectIndex: (selectedList: any) => void;
    isMultipleChoice: boolean;
    resetOtherPicture: () => void;
    invalidMessage: undefined;
    setInvalidMessage: import("react").Dispatch<import("react").SetStateAction<undefined>>;
};
