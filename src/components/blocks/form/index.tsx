// import {
//   For,
//   Show,
//   Switch,
//   Match,
// } from "@kanvas/phoenix-rebirth/dist/lib/server";

import { forwardRef, MemoExoticComponent, PropsWithChildren, JSX } from "react";
import { Controller, useForm, UseControllerProps } from "react-hook-form";
import { FormInputField, FormInputFieldProps } from "./kinds/input";
import { PhoneInputProps } from "@/components/blocks/phone-input";
import { FormFacetedSelect } from "./kinds/faced-select";
import { For, Match, Show, Switch } from "@/lib/server";
import { FormCheckboxField } from "./kinds/checkbox";
import { FormSelectField } from "./kinds/select";
import { FormSwitchField } from "./kinds/switch";
import { FormTextArea } from "./kinds/textarea";
import { FormPhoneInput } from "./kinds/phone";

type Props = FormInputFieldProps & PhoneInputProps;

interface SimpleFormBuilderFieldOptions extends Props {
  options?: Array<{ name: string; value: string; disabled?: boolean }>;
  component?: (props: any) => JSX.Element | MemoExoticComponent<any> | any;
  rules: UseControllerProps["rules"];
  truncateAt?: number;
  infoText?: string;
  kind:
    | "input"
    | "textarea"
    | "select"
    | "checkbox"
    | "switch"
    | "custom"
    | "faceted-select"
    | "phone";
}

export type SimpleFormBuilderFieldDefinition = (
  | SimpleFormBuilderFieldOptions
  | SimpleFormBuilderFieldOptions[]
)[];

type UseSimpleFormBuilderProps = Parameters<typeof useForm>;
type UseSimpleFormBuilderType = ReturnType<typeof useSimpleFormBuilder>;

interface SimpleFormBuilderProps extends PropsWithChildren {
  definitions: UseSimpleFormBuilderType["definitions"];
  hook: UseSimpleFormBuilderType["hook"];
}

/**
 * @example
 * const formFields: SimpleFormBuilderFieldDefinition = [
  [
    {
      name: "firstname",
      label: "First name",
      placeholder: "Add First name",
      kind: "input",
      rules: { required: "First name is required" },
    },
    {
      kind: "input",
      name: "lastname",
      label: "Last name",
      placeholder: "Add Last name",
      rules: { required: "Last name is required" },
    },
  ],
  [
    {
      kind: "input",
      name: "displayname",
      label: "Display name",
      placeholder: "Add Display name",
      rules: { required: "Display name is required" },
    },
    {
      kind: "input",
      name: "email",
      label: "Email",
      placeholder: "Add email",
      rules: {
        required: "Email is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address",
        },
      },
    },
  ],
  {
    kind: "input",
    label: "Phone number",
    name: "phonenumber",
    optional: "true",
    placeholder: "Add Phone number",
    rules: {},
  },
  {
    name: "role",
    label: "User Role",
    placeholder: "Select a role",
    rules: {
      required: "Role is required",
    },
    kind: "select",
    options: [
        {
          name: "User",
          value: "Users",
        },
        {
          name: "Admin",
          value: "Admin",
        },
      ],
    },
  ];

 const { definitions, hook } = useSimpleFormBuilder(formFields, {
    defaultValues: {
      displayname: "",
      phonenumber: "",
      firstname: "",
      lastname: "",
      email: "",
      role: "",
    },
  });

  return (
    <SimpleFormBuilder definitions={definitions} hook={hook} />
  )
 */
export function useSimpleFormBuilder(
  definitions: SimpleFormBuilderFieldDefinition,
  ...props: UseSimpleFormBuilderProps
) {
  const hook = useForm(...props);

  return {
    hook,
    definitions,
  };
}

export const SimpleTextFieldInput = forwardRef((props, ref) => {
  //@ts-expect-error
  return <SimpleTextField {...props} ref={ref} />;
}) as unknown as any;

export function SimpleFormBuilder(props: SimpleFormBuilderProps) {
  const { definitions, hook } = props;

  return (
    <div className="space-y-3 flex flex-col my-2">
      <For each={definitions}>
        {(definition, { key, index }) => {
          const single = definition as unknown as SimpleFormBuilderFieldOptions;

          const multiple =
            definition as unknown as SimpleFormBuilderFieldOptions[];

          const empty = () => <></>;

          const CustomComponent = single.component ?? empty;

          return (
            <Show
              key={`single-${key}-${single.name}-condition`}
              when={Array.isArray(definition)}
              deps={[definitions]}
              fallback={
                <Switch>
                  <Match when={single.kind === "input"}>
                    <Controller
                      name={single.name}
                      control={hook.control}
                      rules={single.optional === "true" ? {} : single.rules}
                      key={`single-${key}-${single.name}-input`}
                      render={({ field, fieldState: { error } }) => (
                        <FormInputField
                          {...single}
                          {...field}
                          key={`single-${key}-${single.name}-input`}
                          placeholder={single.placeholder}
                          infoText={single.infoText}
                          optional={single.optional}
                          helptext={error?.message}
                          error={error ? 1 : 0}
                          label={single.label}
                          type={single.type}
                          id={single.name}
                        />
                      )}
                    />
                  </Match>

                  <Match when={single.kind === "phone"}>
                    <Controller
                      name={single.name}
                      control={hook.control}
                      key={`single-${key}-${single.name}`}
                      rules={single.optional === "true" ? {} : single.rules}
                      render={({ field, fieldState: { error } }) => (
                        <FormPhoneInput
                          {...single}
                          {...field}
                          placeholder={single.placeholder}
                          infoText={single.infoText}
                          optional={single.optional}
                          helptext={error?.message}
                          error={error ? 1 : 0}
                          label={single.label}
                          type={single.type}
                          id={single.name}
                        />
                      )}
                    />
                  </Match>

                  <Match when={single.kind === "textarea"}>
                    <Controller
                      name={single.name}
                      control={hook.control}
                      key={`single-${key}-${single.name}`}
                      rules={single.optional === "true" ? {} : single.rules}
                      render={({ field, fieldState: { error } }) => (
                        // @ts-expect-error
                        <FormTextArea
                          {...single}
                          {...field}
                          placeholder={single.placeholder}
                          infoText={single.infoText}
                          optional={single.optional}
                          helptext={error?.message}
                          error={error ? 1 : 0}
                          label={single.label}
                          type={single.type}
                          id={single.name}
                        />
                      )}
                    />
                  </Match>

                  <Match when={single.kind === "select"}>
                    <Controller
                      name={single.name}
                      control={hook.control}
                      rules={single.optional === "true" ? {} : single.rules}
                      render={({ fieldState: { error }, field }) => (
                        <FormSelectField
                          placeholder={single.placeholder ?? ""}
                          options={[...(single?.options ?? [])]}
                          onValueChange={field.onChange}
                          disabled={single?.disabled}
                          helptext={error?.message}
                          error={error ? 1 : 0}
                          label={single.label}
                          value={field.value}
                        />
                      )}
                    />
                  </Match>

                  <Match when={single.kind === "faceted-select"}>
                    <Controller
                      name={single.name}
                      control={hook.control}
                      rules={single.optional === "true" ? {} : single.rules}
                      render={({ fieldState: { error }, field }) => (
                        <FormFacetedSelect
                          placeholder={single.placeholder ?? ""}
                          options={[...(single?.options ?? [])]}
                          truncateAt={single.truncateAt}
                          onValueChange={field.onChange}
                          disabled={single?.disabled}
                          helptext={error?.message}
                          error={error ? 1 : 0}
                          label={single.label}
                          value={field.value}
                        />
                      )}
                    />
                  </Match>

                  <Match when={single.kind === "checkbox"}>
                    <Controller
                      name={single.name}
                      control={hook.control}
                      rules={single.optional === "true" ? {} : single.rules}
                      render={({ fieldState: { error }, field }) => (
                        <FormCheckboxField
                          key={`multiple-${key}-${single.name}-checkbox`}
                          onCheckedChange={field.onChange}
                          disabled={single?.disabled}
                          optional={single.optional}
                          helptext={error?.message}
                          checked={!!field.value}
                          error={error ? 1 : 0}
                          label={single.label}
                          name={single.name}
                          id={single.name}
                        />
                      )}
                    />
                  </Match>

                  <Match when={single.kind === "switch"}>
                    <Controller
                      name={single.name}
                      control={hook.control}
                      rules={single.optional === "true" ? {} : single.rules}
                      key={`multiple-${key}-${single.name}-switch`}
                      render={({ fieldState: { error }, field }) => (
                        <FormSwitchField
                          onCheckedChange={field.onChange}
                          disabled={single?.disabled}
                          optional={single.optional}
                          helptext={error?.message}
                          checked={!!field.value}
                          error={error ? 1 : 0}
                          label={single.label}
                          name={single.name}
                          id={single.name}
                        />
                      )}
                    />
                  </Match>

                  <Match when={single.kind === "custom"}>
                    <Controller
                      name={single.name}
                      control={hook.control}
                      key={`single-${key}-${single.name}`}
                      rules={single.optional === "true" ? {} : single.rules}
                      render={({ field, fieldState: { error } }) => (
                        <CustomComponent
                          {...single}
                          {...field}
                          key={`single-${key}-${single.name}-input`}
                          placeholder={single.placeholder}
                          optional={single.optional}
                          helptext={error?.message}
                          error={error ? 1 : 0}
                          label={single.label}
                          type={single.type}
                          id={single.name}
                          index={index}
                        />
                      )}
                    />
                  </Match>
                </Switch>
              }
            >
              <div
                className="flex flex-row space-x-2 w-full items-start"
                key={`multiple-${key}-container`}
              >
                <For each={multiple} key={`multiple-${key}-list`}>
                  {(
                    {
                      name,
                      rules,
                      label,
                      kind,
                      options,
                      optional,
                      placeholder,
                      type,
                      disabled,
                      value,
                      component,
                      infoText,
                      truncateAt,
                      ...rest
                    },
                    { key }
                  ) => {
                    const CustomComponentMultiple = (component ?? empty) as any;

                    return (
                      <Switch key={`multiple-${key}-${single.name}-switch`}>
                        <Match when={kind === "input"}>
                          <Controller
                            name={name}
                            control={hook.control}
                            key={`multiple-${name}-${key}-input`}
                            rules={optional === "true" ? {} : rules}
                            render={({ field, fieldState: { error } }) => (
                              <FormInputField
                                {...field}
                                {...rest}
                                disabled={disabled}
                                placeholder={placeholder}
                                helptext={error?.message}
                                error={error ? 1 : 0}
                                infoText={infoText}
                                optional={optional}
                                label={label}
                                type={type}
                                id={name}
                              />
                            )}
                          />
                        </Match>

                        <Match when={kind === "phone"}>
                          <Controller
                            name={name}
                            control={hook.control}
                            key={`multiple-${name}-${key}-phone`}
                            rules={optional === "true" ? {} : rules}
                            render={({ field, fieldState: { error } }) => (
                              <FormPhoneInput
                                {...field}
                                {...rest}
                                disabled={disabled}
                                placeholder={placeholder}
                                helptext={error?.message}
                                error={error ? 1 : 0}
                                infoText={infoText}
                                optional={optional}
                                label={label}
                                type={type}
                                id={name}
                              />
                            )}
                          />
                        </Match>

                        <Match when={kind === "textarea"}>
                          <Controller
                            name={name}
                            control={hook.control}
                            key={`multiple-${name}-${key}-textarea`}
                            rules={optional === "true" ? {} : rules}
                            render={({ field, fieldState: { error } }) => (
                              // @ts-expect-error
                              <FormTextArea
                                {...field}
                                {...rest}
                                placeholder={placeholder}
                                helptext={error?.message}
                                error={error ? 1 : 0}
                                disabled={disabled}
                                infoText={infoText}
                                optional={optional}
                                label={label}
                                type={type}
                                id={name}
                              />
                            )}
                          />
                        </Match>

                        <Match when={kind === "select"}>
                          <Controller
                            name={name}
                            control={hook.control}
                            key={`multiple-${name}-${key}-select`}
                            rules={optional === "true" ? {} : rules}
                            render={({ fieldState: { error }, field }) => (
                              <FormSelectField
                                placeholder={placeholder ?? ""}
                                options={[...(options ?? [])]}
                                onValueChange={field.onChange}
                                helptext={error?.message}
                                error={error ? 1 : 0}
                                value={field.value}
                                disabled={disabled}
                                label={label}
                              />
                            )}
                          />
                        </Match>

                        <Match when={kind === "faceted-select"}>
                          <Controller
                            name={name}
                            control={hook.control}
                            rules={optional === "true" ? {} : rules}
                            key={`multiple-${name}-${key}-faceted-select`}
                            render={({ fieldState: { error }, field }) => (
                              <FormFacetedSelect
                                placeholder={placeholder ?? ""}
                                options={[...(options ?? [])]}
                                onValueChange={field.onChange}
                                helptext={error?.message}
                                truncateAt={truncateAt}
                                error={error ? 1 : 0}
                                disabled={disabled}
                                value={field.value}
                                label={label}
                              />
                            )}
                          />
                        </Match>

                        <Match when={kind === "checkbox"}>
                          <Controller
                            name={name}
                            control={hook.control}
                            key={`multiple-${name}-${key}-checkbox`}
                            rules={optional === "true" ? {} : rules}
                            render={({ fieldState: { error }, field }) => (
                              <FormCheckboxField
                                onCheckedChange={field.onChange}
                                helptext={error?.message}
                                error={error ? 1 : 0}
                                checked={field.value}
                                disabled={disabled}
                                optional={optional}
                                topError="true"
                                label={label}
                                name={name}
                                id={name}
                              />
                            )}
                          />
                        </Match>

                        <Match when={kind === "switch"}>
                          <Controller
                            name={name}
                            control={hook.control}
                            key={`multiple-${name}-${key}-switch`}
                            rules={optional === "true" ? {} : rules}
                            render={({ fieldState: { error }, field }) => (
                              <FormSwitchField
                                onCheckedChange={field.onChange}
                                helptext={error?.message}
                                error={error ? 1 : 0}
                                checked={field.value}
                                disabled={disabled}
                                optional={optional}
                                topError="true"
                                label={label}
                                name={name}
                                id={name}
                              />
                            )}
                          />
                        </Match>

                        <Match when={kind === "custom"}>
                          <Controller
                            name={name}
                            control={hook.control}
                            key={`multiple-${name}-${key}-custom`}
                            rules={optional === "true" ? {} : rules}
                            render={({ fieldState: { error }, field }) => (
                              <CustomComponentMultiple
                                {...field}
                                {...rest}
                                onChange={(v: string) => hook.setValue(name, v)}
                                placeholder={placeholder}
                                helptext={error?.message}
                                error={error ? 1 : 0}
                                disabled={disabled}
                                optional={optional}
                                index={index}
                                label={label}
                                type={type}
                                id={name}
                              />
                            )}
                          />
                        </Match>
                      </Switch>
                    );
                  }}
                </For>
              </div>
            </Show>
          );
        }}
      </For>
    </div>
  );
}
