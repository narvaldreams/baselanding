import ContenidoDynamico from '../admin/contenido/DynamicContent';

interface Props {
  policyPrivacyText: string | undefined | null;
}

export const PolicyPrivacy = ({ policyPrivacyText }: Props) => {
  return (
    <ContenidoDynamico text={ policyPrivacyText ? policyPrivacyText : 'Política de privacidad' } colorText="black" />
  )
}