import { JobData, JobDataMetadata } from "../types/job";
import { DataSourceBadge } from "./DataSourceBadge";

interface CollectedDataSummaryProps {
  jobData: JobData;
  metadata?: JobDataMetadata;
}

export function CollectedDataSummary({ jobData, metadata }: CollectedDataSummaryProps) {
  const fields = [
    { key: 'titulo', label: 'Título' },
    { key: 'senioridade', label: 'Senioridade' },
    { key: 'salario', label: 'Faixa salarial' },
    { key: 'localizacao', label: 'Localização' },
    { key: 'modeloTrabalho', label: 'Modelo de trabalho' },
    { key: 'posicoes', label: 'Posições' },
    { key: 'etapas', label: 'Etapas' },
    { key: 'divulgacao', label: 'Divulgação' },
  ];

  const filledFields = fields.filter(field => {
    const value = jobData[field.key as keyof JobData];
    if (Array.isArray(value)) return value.length > 0;
    return value !== undefined && value !== '';
  });

  if (filledFields.length === 0) return null;

  const formatValue = (key: string, value: any) => {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    // Truncate long values
    const strValue = String(value);
    if (strValue.length > 50) {
      return strValue.substring(0, 50) + '...';
    }
    return strValue;
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-3">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-gray-900">
          Dados coletados ({filledFields.length})
        </h4>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-green-600">
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M5 8L7 10L11 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="space-y-2.5">
        {filledFields.map(field => {
          const value = jobData[field.key as keyof JobData];
          const fieldMetadata = metadata?.[field.key as keyof JobDataMetadata];

          return (
            <div key={field.key} className="flex items-start gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-medium text-gray-600">{field.label}</span>
                  {fieldMetadata && (
                    <DataSourceBadge source={fieldMetadata.source} variant="compact" />
                  )}
                </div>
                <p className="text-sm text-gray-900 break-words">
                  {formatValue(field.key, value)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
