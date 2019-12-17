//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
const rule = require("../../../lib/rules/no-class-components"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
const parserOptions = {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
        jsx: true
    }
};
const errors = [
    {
        message:
            "Do not extend classes [React.]Component and [React.]PureComponent. Use a Functional Component instead. The full documentation can be found here https://gsoftdev.atlassian.net/wiki/spaces/SGSAAS/pages/759562520."
    }
];

const options = [{ ignore: ["settings"] }];

ruleTester.run("no-class-components", rule, {
    valid: [
        {
            filename: "C:/Dev/Sharegate.Gravt/src/frontend/client/src/app/features/settings/settings-page/entrust/entrust-section.jsx",
            code: `
                    import { Checkbox } from "semantic-ui-react";
                    import { EntrustOnboardingPopup } from "@features/onboarding/entrust";
                    import { MIXPANEL_VALUE } from "@contracts/telemetry/mixpanel";
                    import { SectionSeparator } from "@features/settings/settings-page/components/section-separator";
                    import { applyEntrustNewGroupsSettings } from "./actions";
                    import { isEntrustOnboardingCompletedSelector } from "@features/onboarding/status";
                    import { isTenantSubscriptionActiveSelector } from "@features/licensing/subscriptions";
                    import { useDispatch, useSelector } from "react-redux";

                    export const EntrustSection = () => {
                        const dispatch = useDispatch();

                        const isEntrustOnboardingCompleted = useSelector(isEntrustOnboardingCompletedSelector);
                        const isSubActive = useSelector(isTenantSubscriptionActiveSelector);
                        const { entrustNewGroups } = useSelector(state => state.settings.settingsPage.entrust);

                        const onSetEntrusted = () => {
                            dispatch(applyEntrustNewGroupsSettings(!entrustNewGroups));
                        };

                        return (
                            <div className="mt12">
                                <SectionSeparator title="Auto-Entrust" infoLink="https://go.sharegate.com/vyrw" />
                                <div className="mt2 flex items-center">
                                    <label className="pr2 mv4 f5 marine-700">Automatically entrust group to owners when a new group is created.</label>
                                    <EntrustOnboardingPopup
                                        trigger={<Checkbox toggle disabled={!isEntrustOnboardingCompleted} checked={entrustNewGroups} onChange={onSetEntrusted} />}
                                        isOpen={!isEntrustOnboardingCompleted && isSubActive}
                                        source={MIXPANEL_VALUE.settings}
                                    />
                                </div>
                            </div>
                        );
                    };

                `,
            options,
            parserOptions
        },
        {
            filename: "C:/Dev/Sharegate.Gravt/src/frontend/client/src/app/features/errors/errors.js",
            code: `
                class ExtendableError extends Error {
                    constructor(message) {
                        super();
                    }
                }
            `,
            options,
            parserOptions
        },
        {
            filename: "C:/Dev/Sharegate.Gravt/src/frontend/client/src/app/features/settings/components/stop-propagation.js",
            code: `
                    export class StopPropagation extends Component {
                        render() {
                            return <div>{children}</div>;
                        }
                    }
                    `,
            options,
            parserOptions
        }
    ],

    invalid: [
        {
            filename: "C:/Dev/Sharegate.Gravt/src/frontend/client/src/app/features/components/stop-propagation.js",
            code: `
                    export class StopPropagation extends Component {
                        render() {
                            return <div>{children}</div>;
                        }
                    }
                    `,
            options,
            parserOptions,
            errors
        }
    ]
});
