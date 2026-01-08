import { useState, useEffect, useRef } from 'react';
import { Select, Empty } from 'antd';
import { useNavigate } from 'react-router-dom';

import { request } from '@/request';
import useOnFetch from '@/hooks/useOnFetch';
import useDebounce from '@/hooks/useDebounce';
import useLanguage from '@/locale/useLanguage';

export default function AutoCompleteAsync({
  entity,
  displayLabels,
  searchFields,
  outputValue = '_id',
  redirectLabel = 'Add New',
  withRedirect = false,
  urlToRedirect = '/',
  value,
  onChange,
}) {
  const translate = useLanguage();
  const navigate = useNavigate();

  const [options, setOptions] = useState([]);
  const [currentValue, setCurrentValue] = useState(undefined);
  const [search, setSearch] = useState('');
  const [debounced] = useDebounce(search, 500);

  const initialized = useRef(false);

  const { onFetch, result, isSuccess, isLoading } = useOnFetch();

  useEffect(() => {
    if (!debounced) return;

    onFetch(
      request.search({
        entity,
        options: { q: debounced, fields: searchFields },
      })
    );
  }, [debounced]);

  useEffect(() => {
    if (isSuccess && Array.isArray(result)) {
      setOptions(result);
    }
  }, [isSuccess, result]);

  useEffect(() => {
    if (value && !initialized.current) {
      setOptions([value]);
      setCurrentValue(value[outputValue] || value);
      initialized.current = true;
    }
  }, [value]);

  return (
    <Select
      showSearch
      allowClear
      loading={isLoading}
      placeholder={translate('Search')}
      filterOption={false}
      notFoundContent={<Empty />}
      value={currentValue}
      onSearch={setSearch}
      onChange={(val) => {
        setCurrentValue(val);
        onChange?.(val);
        if (val === 'redirectURL' && withRedirect) {
          navigate(urlToRedirect);
        }
      }}
      style={{ minWidth: 220 }}
    >
      {options.map((o) => (
        <Select.Option key={o[outputValue]} value={o[outputValue]}>
          {displayLabels.map((l) => o[l]).join(' ')}
        </Select.Option>
      ))}
      {withRedirect && (
        <Select.Option value="redirectURL">
          + {translate(redirectLabel)}
        </Select.Option>
      )}
    </Select>
  );
}
