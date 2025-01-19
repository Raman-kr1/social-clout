import parse from "html-react-parser";

interface FormattedTextProps {
  text: string;
}

const FormattedText: React.FC<FormattedTextProps> = ({ text }) => {

  const formatText = (input: string): string => {
    return input
      .replace(/\n\n/g, "<br/><br/>") // Replace double line breaks
      .replace(/\n/g, "<br/>") // Replace single line breaks
      .replace(/(#\w+)/g, '<span class="text-blue-500 font-medium">$1</span>'); // Highlight hashtags
  };

  return <p>{parse(formatText(text))}</p>;
};

export default FormattedText;
