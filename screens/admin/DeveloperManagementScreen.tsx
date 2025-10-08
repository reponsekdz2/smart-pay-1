import React, { useState, useEffect } from 'react';
import Header from '../../components/Header.tsx';
import Card from '../../components/Card.tsx';
import { apiGateway } from '../../services/apiGateway.ts';
import type { ApiKey, ApiPermission, GeneratedApiKey, ApiEndpoint } from '../../types.ts';
import { KeyRound, Plus, Copy, Check, Eye, EyeOff } from 'lucide-react';

const AVAILABLE_PERMISSIONS: ApiPermission[] = ['transactions:create', 'transactions:read', 'users:read', 'wallets:read'];

const useCopyToClipboard = () => {
    const [copied, setCopied] = useState(false);
    const copy = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };
    return { copied, copy };
};

const DeveloperManagementScreen: React.FC = () => {
    const [merchantName, setMerchantName] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState<ApiPermission[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [generatedKey, setGeneratedKey] = useState<GeneratedApiKey | null>(null);
    const [existingKeys, setExistingKeys] = useState<ApiKey[]>([]);

    const fetchKeys = async () => {
        const res = await apiGateway.apiGenerator.getApiKeys();
        if (res.success) setExistingKeys(res.data);
    };

    useEffect(() => {
        fetchKeys();
    }, []);

    const handlePermissionToggle = (permission: ApiPermission) => {
        setSelectedPermissions(prev =>
            prev.includes(permission)
                ? prev.filter(p => p !== permission)
                : [...prev, permission]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!merchantName || selectedPermissions.length === 0) return;
        setIsLoading(true);
        setGeneratedKey(null);
        const res = await apiGateway.apiGenerator.generateApiKey({ merchantName, permissions: selectedPermissions });
        if (res.success) {
            setGeneratedKey(res.data);
            await fetchKeys(); // Refresh the list
        }
        setIsLoading(false);
        setMerchantName('');
        setSelectedPermissions([]);
    };
    
    const CredentialDisplay: React.FC<{ label: string; value: string; isSecret?: boolean }> = ({ label, value, isSecret = false }) => {
        const { copied, copy } = useCopyToClipboard();
        const [show, setShow] = useState(!isSecret);
        
        return (
            <div>
                <label className="text-sm font-medium text-textSecondary dark:text-gray-400">{label}</label>
                <div className="flex items-center space-x-2 mt-1">
                    <input
                        type={show ? 'text' : 'password'}
                        readOnly
                        value={value}
                        className="w-full p-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md font-mono"
                    />
                    {isSecret && (
                        <button onClick={() => setShow(!show)} className="p-2 text-gray-500">
                            {show ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    )}
                    <button onClick={() => copy(value)} className="p-2 text-gray-500">
                        {copied ? <Check size={20} className="text-success" /> : <Copy size={20} />}
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div>
            <Header title="Developer Management" />
            <main className="p-4 space-y-6">
                <Card>
                    <h2 className="text-xl font-bold flex items-center"><KeyRound className="mr-2 text-primary" /> Generate New API Key</h2>
                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                        <div>
                            <label htmlFor="merchantName" className="block text-sm font-medium text-textSecondary dark:text-gray-300">Merchant Name</label>
                            <input
                                id="merchantName"
                                type="text"
                                value={merchantName}
                                onChange={(e) => setMerchantName(e.target.value)}
                                placeholder="e.g., Cool Tech Inc."
                                className="mt-1 w-full p-2 bg-surface dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-textSecondary dark:text-gray-300">Permissions</label>
                            <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
                                {AVAILABLE_PERMISSIONS.map(permission => (
                                    <button
                                        type="button"
                                        key={permission}
                                        onClick={() => handlePermissionToggle(permission)}
                                        className={`p-2 rounded-md text-sm text-left ${selectedPermissions.includes(permission) ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                                    >
                                        {permission}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center space-x-2 bg-primary text-white font-bold py-2 rounded-lg disabled:bg-primary/50">
                            <Plus /> <span>{isLoading ? 'Generating...' : 'Generate Key'}</span>
                        </button>
                    </form>
                </Card>

                {generatedKey && (
                    <Card className="border-2 border-primary animate-fade-in-down">
                        <h3 className="text-lg font-bold text-success">API Key Generated Successfully!</h3>
                        <p className="text-sm text-textSecondary dark:text-gray-400 mb-4">Please save the API Secret now. You will not be able to see it again.</p>
                        <div className="space-y-4">
                            <CredentialDisplay label="API Key" value={generatedKey.apiKey} />
                            <CredentialDisplay label="API Secret" value={generatedKey.apiSecret} isSecret />
                        </div>
                         <h4 className="font-semibold mt-4 mb-2">Enabled Endpoints:</h4>
                         <div className="text-sm font-mono bg-gray-100 dark:bg-gray-900 p-2 rounded-md space-y-1">
                            {apiGateway.apiGenerator.getApiEndpoints(generatedKey.permissions).map((ep, i) => (
                                <p key={i}><span className={ep.method === 'POST' ? 'text-green-500' : 'text-blue-500'}>{ep.method}</span> {ep.path}</p>
                            ))}
                         </div>
                    </Card>
                )}

                <Card>
                    <h2 className="text-xl font-bold">Existing API Keys</h2>
                    <div className="mt-4 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-textPrimary dark:text-white sm:pl-0">Merchant</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-textPrimary dark:text-white">API Key</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-textPrimary dark:text-white">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                        {existingKeys.map((key) => (
                                            <tr key={key.id}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-textPrimary dark:text-white sm:pl-0">{key.merchantName}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-textSecondary dark:text-gray-400 font-mono">{`${key.apiKey.substring(0, 12)}...`}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 capitalize">{key.status}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Card>
            </main>
        </div>
    );
};

export default DeveloperManagementScreen;